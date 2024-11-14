"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionController_1 = require("../../controllers/submissionController");
const CreateSubmissionDtos_1 = require("../../dtos/CreateSubmissionDtos");
const createSubmissionValidator_1 = require("../../validators/createSubmissionValidator");
const submissionRouter = express_1.default.Router();
submissionRouter.post('/', (0, createSubmissionValidator_1.validate)(CreateSubmissionDtos_1.createSubmmissionZodSchema), submissionController_1.addSubmission);
exports.default = submissionRouter;
