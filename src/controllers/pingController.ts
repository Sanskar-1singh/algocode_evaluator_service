// In pingController.ts
import { Request, Response,NextFunction } from 'express';

export const pingCheck = (__: Request, res: Response, _: NextFunction)=> {
     res.json({ message: "OK DONE" });
};


