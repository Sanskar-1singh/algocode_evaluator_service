import { Job, Worker } from "bullmq";

import sampleJobs from "../jobs/sampleJobs";
import IJob from "../types/bullMqjobDefination";

import WorkerResponse from "../types/bullMqworkerResponse";
import redisConnection from "../config/redisConfig";

export default function SampleWorker(queuename: string) {
    console.log('worker');
  const ___ = new Worker(
    queuename,
    async (job: Job) => {
      //  console.log(job);
      if (job.name === "sampleJobs") {//we always add task to do in queue as JOBS>>>
        const samplejobinstances = new sampleJobs(job.data);
        samplejobinstances.handle(job);
        return true;
      }
    },
    {
      connection: redisConnection,
    }
  );
}
