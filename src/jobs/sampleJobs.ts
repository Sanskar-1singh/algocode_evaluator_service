import { Job } from "bullmq";

import  IJob  from "../types/bullMqjobDefination";

export default class sampleJobs implements IJob{
        name:string;
        payload?: Record<string, unknown>;
        constructor(payload:Record<string,unknown>){
            this.payload=payload;
            this.name=this.constructor.name;
        }
        handle=(job?:Job)=>{
            console.log("handler of job called");
            console.log(this.payload);
            if(job){
                console.log(job.name,job.id,job.data);
            }
        }
       failure=(job?:Job):void =>{
        console.log("job failed");
        if(job){
            console.log(job.id);
        }
       };
}