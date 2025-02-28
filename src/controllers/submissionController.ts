// submissionController.ts
import { Request, Response, NextFunction } from "express";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDtos";

export const addSubmission = (req: Request, res: Response) => {
  const submissionDto = req.body as CreateSubmissionDto; //it promising that req.body will adhere createSubmissionDto  property if not will it will not eventually throw error>>>

  //TS didnt check types at runtime>>>
  //how TS assume req.body as any type at runtime  of express???
  //stick ot principle to ensure type checkking at compile time TS will help to verify types at runtime ZOD will help>>

  res.status(201).json({
    success: true,
    error: {},
    message: "Successfully collected the submission",
    data: submissionDto,
  });
};
