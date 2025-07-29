import express, { Request, Response } from 'express';
import path from 'path';
const router = express.Router();

/* GET monitoring page. */
router.get('/', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '..', 'public', 'monitoring.html'));
});

export default router;
