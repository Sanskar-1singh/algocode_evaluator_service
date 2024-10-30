"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class sampleJobs {
    constructor(payload) {
        this.handle = (job) => {
            console.log("handler of job called");
            console.log(this.payload);
            if (job) {
                console.log(job.name, job.id, job.data);
            }
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
