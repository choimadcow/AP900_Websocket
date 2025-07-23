import createError from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'; // CORS 미들웨어 추가

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// CORS 미들웨어 추가 (모든 출처 허용)
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import {createMockData} from './services/mock-data';

let timer: NodeJS.Timeout | null = null;
let timer2: NodeJS.Timeout | null = null;

app.get('/:param', (req, res) => {
    const clients = req.app.get('clients'); // Changed from io
    const param = req.params.param;

    // Helper function to send message to all connected clients
    const broadcastMessage = (message: string) => {
        clients.forEach((client: any) => { // client type is WebSocket from 'ws'
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    };

    switch (param) {
        case 'send':
            const payload = createMockData(false, true);
            broadcastMessage(JSON.stringify(payload)); // Changed from io.emit
            res.send('send command sent');
            break;
        case 'start':
            if (timer) {
                res.send('Already running');
            } else {
                createMockData(false, false); // 초기화
                timer = setInterval(() => {
                    const payload = createMockData(true);
                    broadcastMessage(JSON.stringify(payload)); // Changed from io.emit
                }, 100);
                res.send('start command sent');
            }
            if (timer2) {
                res.send('Already running');
            } else {
                createMockData(false, true); // 초기화

                const minDelay = 1 * 1000;
                const maxDelay = 1.5 * 1000;

                const scheduleNext = () => {
                    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

                    timer2 = setTimeout(() => {
                        const payload = createMockData(false, true);
                        broadcastMessage(JSON.stringify(payload)); // Changed from io.emit
                        scheduleNext();
                    }, randomDelay);
                }

                scheduleNext();
                res.send('slow command sent');
            }
            break;
        case 'slow':
            // if (timer2) {
            //     res.send('Already running');
            // } else {
            //     createMockData(false, true); // 초기화
            //
            //     const minDelay = 1 * 1000;
            //     const maxDelay = 1.5 * 1000;
            //
            //     const scheduleNext = () => {
            //         const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            //
            //         timer2 = setTimeout(() => {
            //             const payload = createMockData(false, true);
            //             broadcastMessage(JSON.stringify(payload)); // Changed from io.emit
            //             scheduleNext();
            //         }, randomDelay);
            //     }
            //
            //     scheduleNext();
            //     res.send('slow command sent');
            // }
            break;
        case 'stop':
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            if (timer2) {
                clearTimeout(timer2);
                timer2 = null;
            }
            res.send('stop command sent');
            break;
        case 'error':
            broadcastMessage('error command received'); // Changed from io.emit
            res.send('error command sent');
            break;
        default:
            res.status(400).send('Invalid parameter');
    }
});

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
