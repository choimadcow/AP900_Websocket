import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import { createMockData } from './services/mock-data';

let timer: NodeJS.Timeout | null = null;
let timer2: NodeJS.Timeout | null = null;

app.get('/:param', (req, res) => {
  const io = req.app.get('io');
  const param = req.params.param;

  switch (param) {
    case 'send':
      const payload = createMockData(false, true);
      io.emit('message', JSON.stringify(payload));
      res.send('send command sent');
      break;
    case 'start':
      if (timer) {
        res.send('Already running');
      } else {
        createMockData(false, false); // 초기화
        timer = setInterval(() => {
          const payload = createMockData(true);
          io.emit('message', JSON.stringify(payload));
        }, 100);
        res.send('start command sent');
      }
      break;
    case 'slow':
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
                    io.emit('message', JSON.stringify(payload));
                    scheduleNext();
                }, randomDelay);
            }

            scheduleNext();
            res.send('slow command sent');
        }
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
      io.emit('message', 'error command received');
      res.send('error command sent');
      break;
    default:
      res.status(400).send('Invalid parameter');
  }
});

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
