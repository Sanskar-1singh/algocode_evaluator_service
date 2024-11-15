import {Job,Worker} from "bullmq";

import SubmisisonJobs from "../jobs/SubmissionJobs";
import IJob from "../types/bullMqjobDefination";

import  WorkerResponse  from "../types/bullMqworkerResponse";
import redisConnection from "../config/redisConfig";

export default function SubmissionWorker(queuename:string){
    const ___=new Worker(
        queuename,
        async(job:Job)=>{
           if(job.name==="SubmissionJobs"){
            const SubmisisonJobsinstances=new SubmisisonJobs(job.data);
            SubmisisonJobsinstances.handle(job);
           }
        },
        {
            connection:redisConnection
        }
    )
}