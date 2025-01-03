// submissionController.ts
import { Request, Response, NextFunction } from "express";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDtos";

export const addSubmission = (req: Request, res: Response,__:NextFunction)=> {
  const submissionDto = req.body as CreateSubmissionDto;

   res.status(201).json({
    success: true,
    error: {},
    message: "Successfully collected the submission",
    data: submissionDto,
  });
};
