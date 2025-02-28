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
exports.default = SampleWorker;
const bullmq_1 = require("bullmq");
const sampleJobs_1 = __importDefault(require("../jobs/sampleJobs"));
const redisConfig_1 = __importDefault(require("../config/redisConfig"));
function SampleWorker(queuename) {
    console.log('worker');
    const ___ = new bullmq_1.Worker(queuename, (job) => __awaiter(this, void 0, void 0, function* () {
        //  console.log(job);
        if (job.name === "sampleJobs") { //we always add task to do in queue as JOBS>>>
            const samplejobinstances = new sampleJobs_1.default(job.data);
            samplejobinstances.handle(job);
            return true;
        }
    }), {
        connection: redisConfig_1.default,
    });
}
