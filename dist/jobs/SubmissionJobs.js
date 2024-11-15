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
const runCppDocker_1 = __importDefault(require("../containers/runCppDocker"));
class SubmissionJobs {
    constructor(payload) {
        this.handle = (job) => __awaiter(this, void 0, void 0, function* () {
            console.log("handler of job called");
            console.log(this.payload);
            if (job && this.payload) {
                const key = (parseInt)(Object.keys(this.payload)[0], 10);
                console.log(this.payload);
                console.log(this.payload[key].language);
                if (this.payload[key].language == "CPP") {
                    const response = yield (0, runCppDocker_1.default)(this.payload[key].code, this.payload[key].val);
                    console.log("evaluated response is", response);
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
