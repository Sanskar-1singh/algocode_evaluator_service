"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubmissionWorker;
const bullmq_1 = require("bullmq");
const SubmissionJobs_1 = __importDefault(require("../jobs/SubmissionJobs"));
const redisConfig_1 = __importDefault(require("../config/redisConfig"));
function SubmissionWorker(queuename) {
    const ___ = new bullmq_1.Worker(queuename, (job) => __awaiter(this, void 0, void 0, function* () {
        if (job.name === "SubmissionJobs") {
            const SubmisisonJobsinstances = new SubmissionJobs_1.default(job.data);
            SubmisisonJobsinstances.handle(job);
        }
    }), {
        connection: redisConfig_1.default
    });
}
