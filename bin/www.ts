#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debug from 'debug';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import express, {Request, Response} from "express";

const log = debug('ap900-websocket:server');
const router = express.Router();

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set<WebSocket>(); // To store connected WebSocket clients

let passengerCount: number = 0;

router.get('/api/passenger-count', (req: Request, res: Response) => {
  res.json({ passengerCount: passengerCount });
});

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  console.log('A WebSocket client connected');

  ws.on('message', (message: Buffer) => {
    // Handle messages from clients if needed
    console.log('Received message from client:', message.toString());

    try {
      const messageString = message.toString();
      const hmiMessage = JSON.parse(messageString) as HMIInfoPb;

      if (hmiMessage.event && hmiMessage.event.eventType === 129) {
        const content = JSON.parse(hmiMessage.event.Content) as ContentData;
        if (content.type === 'PassengerCountUpdate') {
          const count = parseInt(String(content.value), 10);

          if (!isNaN(count)) {
            passengerCount = count;
            console.log(`Passenger count updated to: ${passengerCount}`);
            // 필요시 클라이언트에게 성공 응답을 다시 보낼 수 있습니다.
          }
        }
      }
    } catch(err) {
      console.error('Failed to process message:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('A WebSocket client disconnected');
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

app.set('wss', wss);
app.set('clients', clients);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + (addr ? addr.port : '');
  log('Listening on ' + bind);
}
