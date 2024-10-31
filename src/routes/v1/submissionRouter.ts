import express, { Router,NextFunction,Response,Request,RequestHandler } from "express";

import { addSubmission  } from "../../controllers/submissionController";
import { CreateSubmissionDto } from "../../dtos/CreateSubmissionDtos";


const submissionRouter :Router= express.Router();

submissionRouter.post('/', addSubmission);

export default submissionRouter;