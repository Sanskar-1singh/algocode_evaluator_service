import { Job } from "bullmq";

import  IJob  from "../types/bullMqjobDefination";

export default class sampleJobs implements IJob{
        name:string;
        payload?: Record<string, unknown>;//not understood record<>????here payload means nothings it just refering to bydefault property of jobs.data>>>
        
        constructor(payload:Record<string,unknown>){
            this.payload=payload;
            this.name=this.constructor.name;
        }
        handle=(job?:Job):void=>{
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