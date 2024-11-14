import express from 'express';
import { addSubmission } from "../../controllers/submissionController";
import { createSubmmissionZodSchema } from '../../dtos/CreateSubmissionDtos';
import { validate } from '../../validators/createSubmissionValidator';
const submissionRouter=express.Router();
submissionRouter.post('/',validate(createSubmmissionZodSchema),addSubmission);

export default  submissionRouter;
