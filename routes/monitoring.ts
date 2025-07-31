import express, { Request, Response } from 'express';
import path from 'path';
import { getPassengerCount, getErrorInfo, setPassengerCount, setErrorInfo } from '../state';

const router = express.Router();

// let passengerCount: number | null = null; // 승객 수를 저장할 변수
// let errInfo: string | null = null;

/* GET monitoring page. */
router.get('/', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '..', 'public', 'monitoring.html'));
});

/* GET passenger count from param and store it. */
// router.get('/passenger-count/:param', (req: Request, res: Response) => {
//   const count = parseInt(req.params.param, 10);
//   if (!isNaN(count)) {
//     passengerCount = count;
//     console.log(`Passenger count updated to: ${passengerCount}`);
//     res.status(200).send(`Passenger count updated to ${passengerCount}`);
//   } else {
//     res.status(400).send('Invalid passenger count parameter.');
//   }
// });
router.get('/passenger-count/:param', (req: Request, res: Response) => {
  const count = parseInt(req.params.param, 10);
  if (!isNaN(count)) {
    setPassengerCount(count); // 중앙 상태 업데이트
    console.log(`Passenger count updated to: ${count}`);
    res.status(200).send(`Passenger count updated to ${count}`);
  } else {
    res.status(400).send('Invalid passenger count parameter.');
  }
});

/* GET API for passenger count. */
// router.get('/api/passenger-count', (req: Request, res: Response) => {
//   res.json({ passengerCount: passengerCount });
// });
router.get('/api/passenger-count', (req: Request, res: Response) => {
  // 3. 중앙 상태 관리 함수를 호출해 최신 값을 가져옵니다.
  const currentCount = getPassengerCount();
  res.json({ passengerCount: currentCount });
});

// router.get('/error-info/:param', (req: Request, res: Response) => {
//   const errorTypeString: string = req.params.param;
//   console.log("error info에서 받아온 값 : ", errorTypeString);
//
//   let responseMessage: string;
//   if (errorTypeString === "OBJ_RECOG_ERR") {
//     errInfo = errorTypeString;
//     responseMessage = "객체인식오류";
//   } else if (errorTypeString === "TAKE_OVER") {
//     errInfo = errorTypeString;
//     responseMessage = "Take Over";
//   } else {
//     res.status(400).send('Invalid error type parameter.');
//     return;
//   }
//
//   console.log(`Error info updated to: ${responseMessage}`);
//   res.status(200).send(`Error info updated to ${responseMessage}`);
// });
//
// /* GET API for passenger count. */
// router.get('/api/error-info', (req: Request, res: Response) => {
//   res.json({ errInfo: errInfo });
// });

export default router;
