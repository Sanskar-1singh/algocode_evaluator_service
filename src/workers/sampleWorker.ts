import {Job,Worker} from "bullmq";

import sampleJobs from "../jobs/sampleJobs";
import IJob from "../types/bullMqjobDefination";

import  WorkerResponse  from "../types/bullMqworkerResponse";
import redisConnection from "../config/redisConfig";

export default function SampleWorker(queuename:string){
    const ___=new Worker(
        queuename,
        async(job:Job)=>{
           if(job.name==="sampleJobs"){
            const samplejobinstances=new sampleJobs(job.data);
            samplejobinstances.handle(job);
           }
        },
        {
            connection:redisConnection
        }
    )
}