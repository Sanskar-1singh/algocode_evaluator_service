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
const ExecutorFactory_1 = __importDefault(require("../utils/ExecutorFactory"));
const evaluationQueueproducer_1 = __importDefault(require("../producers/evaluationQueueproducer"));
class SubmissionJobs {
    constructor(payload) {
        this.handle = (job) => __awaiter(this, void 0, void 0, function* () {
            console.log("handler of job called");
            console.log(this.payload);
            if (job) {
                const key = Object.keys(this.payload)[0];
                const codeLanguage = this.payload[key].language;
                console.log(codeLanguage);
                const code = this.payload[key].code;
                const inputTestcase = this.payload[key].inputCase;
                const outputTestCase = this.payload[key].outputCase;
                const strategy = (0, ExecutorFactory_1.default)(codeLanguage);
                console.log(strategy);
                if (strategy != null) {
                    const response = yield strategy.execute(code, inputTestcase, outputTestCase);
                    (0, evaluationQueueproducer_1.default)({ response, userId: this.payload[key].userId, submissionId: this.payload[key].submissionId });
                    if (response.status == 'SUCCESS') {
                        console.log("code executed successfully");
                        console.log(response);
                    }
                    else {
                        console.log("something went wrong");
                        console.log(response);
                    }
                }
            }
        });
        this.failure = (job) => {
            console.log("job failed");
            if (job) {
                console.log(job.id);
            }
        };
        this.payload = payload;
        this.name = this.constructor.name;
    }
}
exports.default = SubmissionJobs;
