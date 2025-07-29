import express, { Request, Response } from 'express';
import path from 'path';
const router = express.Router();

let passengerCount: number | null = null; // 승객 수를 저장할 변수
let errInfo: Boolean | null = null;

/* GET monitoring page. */
router.get('/', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '..', 'public', 'monitoring.html'));
});

/* GET passenger count from param and store it. */
router.get('/passenger-count/:param', (req: Request, res: Response) => {
  const count = parseInt(req.params.param, 10);
  if (!isNaN(count)) {
    passengerCount = count;
    console.log(`Passenger count updated to: ${passengerCount}`);
    res.status(200).send(`Passenger count updated to ${passengerCount}`);
  } else {
    res.status(400).send('Invalid passenger count parameter.');
  }
});

/* GET API for passenger count. */
router.get('/api/passenger-count', (req: Request, res: Response) => {
  res.json({ passengerCount: passengerCount });
});

router.get('/error-info/:param', (req: Request, res: Response) => {
  const errType: boolean = Boolean(req.params.param);
  if (errType) {
    errInfo = errType;
    console.log(`Passenger count updated to: ${errType ? "객체인식오류" : "Take Over"}`);
    res.status(200).send(`Passenger count updated to ${errType ? "객체인식오류" : "Take Over"}`);
  } else {
    res.status(400).send('Invalid passenger count parameter.');
  }
});

/* GET API for passenger count. */
router.get('/api/error-info', (req: Request, res: Response) => {
  res.json({ errInfo: errInfo });
});

export default router;
