"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class sampleJobs {
    constructor(payload) {
        this.handle = () => {
            console.log("handler of job called");
        };
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
exports.default = sampleJobs;
