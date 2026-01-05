#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debug from 'debug';
import http from 'http';
import { WebSocketServer, WebSocket, RawData } from 'ws';
import { IncomingMessage } from 'http';
import monitoringRouter from "../routes/monitoring";
import {setErrorInfo, setPassengerCount} from "../state";

const log = debug('ap900-websocket:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.use('/monitoring', monitoringRouter);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set<WebSocket>(); // To store connected WebSocket clients

// 서브넷별 클라이언트 그룹 관리
const clientsBySubnet = new Map<string, Set<WebSocket>>();

// IP에서 서브넷 추출 (C클래스 기준: xxx.xxx.xxx.0)
const getSubnet = (ip: string): string => {
  // IPv4 매핑된 IPv6 주소 처리 (::ffff:192.168.1.1 → 192.168.1.1)
  const cleanIP = ip.replace(/^::ffff:/, '');
  const parts = cleanIP.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  return cleanIP; // IPv6는 그대로 반환
};

// WebSocket에 subnet 속성 추가를 위한 타입 확장
interface ExtendedWebSocket extends WebSocket {
  subnet?: string;
  clientIP?: string;
}

wss.on('connection', (ws: ExtendedWebSocket, req: IncomingMessage) => {
  // 클라이언트 IP 가져오기
  const clientIP = req.socket.remoteAddress || 'unknown';
  const subnet = getSubnet(clientIP);
  
  // WebSocket 객체에 IP와 서브넷 정보 저장
  ws.clientIP = clientIP;
  ws.subnet = subnet;
  
  // 전체 클라이언트 Set에 추가
  clients.add(ws);
  
  // 서브넷별 그룹에 추가
  if (!clientsBySubnet.has(subnet)) {
    clientsBySubnet.set(subnet, new Set<WebSocket>());
  }
  clientsBySubnet.get(subnet)!.add(ws);
  
  console.log(`WebSocket 클라이언트 연결: IP=${clientIP}, Subnet=${subnet}`);
  console.log(`현재 연결된 클라이언트 수: ${clients.size}`);

  ws.on('message', (message: RawData) => {
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
            setPassengerCount(count);
            console.log(`Passenger count updated to: ${count}`);
            // 필요시 클라이언트에게 성공 응답을 다시 보낼 수 있습니다.
          }
        } else if(content.type === 'BusOperation') {

        } else if(content.type === 'TakeOverReason') {
          const errMsg: string = String(content.value);

          if(errMsg != null) {
            setErrorInfo(errMsg);
            console.log(`${errMsg} 메세지를 받았슴다`);
          }
        }
      }
    } catch(err) {
      console.error('Failed to process message:', err);
    }
  });

  ws.on('close', () => {
    // 전체 클라이언트 Set에서 제거
    clients.delete(ws);
    
    // 서브넷별 그룹에서 제거
    if (ws.subnet && clientsBySubnet.has(ws.subnet)) {
      clientsBySubnet.get(ws.subnet)!.delete(ws);
      // 빈 그룹은 삭제
      if (clientsBySubnet.get(ws.subnet)!.size === 0) {
        clientsBySubnet.delete(ws.subnet);
      }
    }
    
    console.log(`WebSocket 클라이언트 연결 종료: IP=${ws.clientIP}, Subnet=${ws.subnet}`);
    console.log(`현재 연결된 클라이언트 수: ${clients.size}`);
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

app.set('wss', wss);
app.set('clients', clients);
app.set('clientsBySubnet', clientsBySubnet);  // 서브넷별 클라이언트 그룹도 app에 저장

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

// 타입 정의 (기존 코드에 있던 것으로 추정)
interface HMIInfoPb {
  event?: {
    eventType: number;
    Content: string;
  };
}

interface ContentData {
  type: string;
  value: string | number;
}