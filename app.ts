import createError from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'; // CORS 미들웨어 추가

// import indexRouter from './routes/index';
import usersRouter from './routes/users';
import monitoringRouter from './routes/monitoring';

const app = express();
app.set('trust proxy', 1);

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

import {changeDriveMode, createMockData, changeStatus, SENSOR_FAIL_CODES, createDriverMessageEvent} from './services/mock-data';

let timer: NodeJS.Timeout | null = null;
let timer2: NodeJS.Timeout | null = null;

app.get("/auto-start", (req: Request, res: Response) => {
    console.log("자율주행 운행 시작!");
    const clients = req.app.get('clients');
    const updatedMockData = changeDriveMode(true);
    const broadcastMessage = (message: string) => {
        clients.forEach((client: any) => { // client type is WebSocket from 'ws'
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    };

    broadcastMessage(JSON.stringify(updatedMockData));
    res.status(200).json({ message: "Auto-start command sent successfully." });
});

app.get("/auto-stop", (req: Request, res: Response) => {
    console.log("자율주행 운행 종료!");
    const clients = req.app.get('clients');
    const updatedMockData = changeDriveMode(false);
    const broadcastMessage = (message: string) => {
        clients.forEach((client: any) => { // client type is WebSocket from 'ws'
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    };

    broadcastMessage(JSON.stringify(updatedMockData));
    res.status(200).json({ message: "Auto-stop command sent successfully." });
});

app.use('/monitoring', monitoringRouter);

app.get("/:param", (req, res) => {
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
            if (timer || timer2) {
                res.send('Already running');
            } else {
                createMockData(false, false); // 초기화
                timer = setInterval(() => {
                    const payload = createMockData(true);
                    broadcastMessage(JSON.stringify(payload));
                }, 100);

                createMockData(false, true); // 초기화
                const minDelay = 1000;
                const maxDelay = 1.5 * 1000;

                const scheduleNext = () => {
                    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
                    timer2 = setTimeout(() => {
                        const payload = createMockData(false, true);
                        broadcastMessage(JSON.stringify(payload));
                        scheduleNext();
                    }, randomDelay);
                };
                scheduleNext();
                
                res.send('start and slow commands sent');
            }
            break;
        case 'slow':
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

app.get("/change-status/:param", (req: Request, res: Response) => {
    const param = req.params.param;
    const clients = req.app.get('clients');

    const broadcastMessage = (message: string) => {
        clients.forEach((client: any) => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    };

    let statusCode: number | undefined;
    let turnOn: boolean | undefined;
    let actionName: string = "";

    switch (param) {
        case 'radar-on':
            statusCode = SENSOR_FAIL_CODES.VISION_LIDAR_FAIL;
            turnOn = true;
            actionName = "Radar ON";
            break;
        case 'radar-off':
            statusCode = SENSOR_FAIL_CODES.VISION_LIDAR_FAIL;
            turnOn = false;
            actionName = "Radar OFF";
            break;
        case 'camera-on':
            statusCode = SENSOR_FAIL_CODES.VISION_CAMERA_FAIL;
            turnOn = true;
            actionName = "Camera ON";
            break;
        case 'camera-off':
            statusCode = SENSOR_FAIL_CODES.VISION_CAMERA_FAIL;
            turnOn = false;
            actionName = "Camera OFF";
            break;
        case 'gps-on':
            statusCode = SENSOR_FAIL_CODES.VISION_GPS_FAIL;
            turnOn = true;
            actionName = "GPS ON";
            break;
        case 'gps-off':
            statusCode = SENSOR_FAIL_CODES.VISION_GPS_FAIL;
            turnOn = false;
            actionName = "GPS OFF";
            break;
        case 'recog-on':
            statusCode = SENSOR_FAIL_CODES.VISION_SYSTEM_FAIL; // '인식'에 대한 일반적인 오류
            turnOn = true;
            actionName = "Recognition ON";
            break;
        case 'recog-off':
            statusCode = SENSOR_FAIL_CODES.VISION_SYSTEM_FAIL;
            turnOn = false;
            actionName = "Recognition OFF";
            break;
        case 'judge-on':
            statusCode = SENSOR_FAIL_CODES.DEVIATE_ROUTE; // '판단'에 대한 예시 오류
            turnOn = true;
            actionName = "Judgment ON";
            break;
        case 'judge-off':
            statusCode = SENSOR_FAIL_CODES.DEVIATE_ROUTE;
            turnOn = false;
            actionName = "Judgment OFF";
            break;
        case 'ctrl-on':
            statusCode = SENSOR_FAIL_CODES.CONTROL_SYSTEM_FAIL;
            turnOn = true;
            actionName = "Control ON";
            break;
        case 'ctrl-off':
            statusCode = SENSOR_FAIL_CODES.CONTROL_SYSTEM_FAIL;
            turnOn = false;
            actionName = "Control OFF";
            break;
        case 'internet-on':
            statusCode = SENSOR_FAIL_CODES.INTERNET_FAIL;
            turnOn = true;
            actionName = "Internet ON";
            break;
        case 'internet-off':
            statusCode = SENSOR_FAIL_CODES.INTERNET_FAIL;
            turnOn = false;
            actionName = "Internet OFF";
            break;
        case 'v2i-on':
            statusCode = SENSOR_FAIL_CODES.V2I_FAIL;
            turnOn = true;
            actionName = "V2I ON";
            break;
        case 'v2i-off':
            statusCode = SENSOR_FAIL_CODES.V2I_FAIL;
            turnOn = false;
            actionName = "V2I OFF";
            break;
        default:
            res.status(400).json({ message: "Invalid change-status parameter." });
            return;
    }

    if (statusCode !== undefined && turnOn !== undefined) {
        console.log(`[APP.TS DEBUG] Calling changeStatus with statusCode: 0x${statusCode.toString(16)}, turnOn: ${turnOn}`);
        const updatedMockData = changeStatus(statusCode, turnOn);
        broadcastMessage(JSON.stringify(updatedMockData));
        res.status(200).json({ message: `Sensor status updated: ${actionName}` });
    } else {
        res.status(500).json({ message: "Internal server error: Status code or turnOn not determined." });
    }
});

app.get("/send-driver-message/:icon", (req: Request, res: Response) => {
    const clients = req.app.get('clients');
    const icon = req.params.icon;
    let message: string;

    switch (icon) {
        case "red":
            message = "<span style='color:red;'>주행경로를 이탈</span>했습니다.<br>운전대를 잡아주시길 바랍니다";
            break;
        case "yellow":
            message = "<span style='color:yellow;'>교통약자보호구역</span> 입니다<br>운전대를 잡아주시길 바랍니다";
            break;
        case "green":
            message = "현재 자율운행을 하고 있습니다<br><span style='color:green;'>편안한 운전</span> 하시길 바랍니다";
            break;
        default:
            return res.status(400).json({ message: "Invalid icon parameter. Use 'red', 'yellow', or 'green'." });
    }
    
    const payload = createDriverMessageEvent(icon, message);
    
    clients.forEach((client: any) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(payload));
        }
    });
    
    res.status(200).json({ message: `DriverMessage with icon '${icon}' sent successfully.` });
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
