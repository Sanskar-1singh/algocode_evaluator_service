import { Job } from "bullmq";

import  IJob  from "../types/bullMqjobDefination";
import { SubmisisonPayload } from "../types/SubmisisonPayload";
import runCpp from "../containers/runCppDocker";

export default class SubmissionJobs implements IJob{
        name:string;
        payload?: Record<string, SubmisisonPayload>;
        constructor(payload:Record<string,SubmisisonPayload>){
            this.payload=payload;
            this.name=this.constructor.name;
        }
        handle=async(job?:Job)=>{
            console.log("handler of job called");
            console.log(this.payload);
            if(job && this.payload){
                const key=(parseInt)(Object.keys(this.payload)[0],10);
                console.log(this.payload);
                console.log(this.payload[key].language);

                if(this.payload[key].language=="CPP"){
                    const response=await runCpp(this.payload[key].code,this.payload[key].val);
                    console.log("evaluated response is",response);
                }


            }
        }
       failure=(job?:Job):void =>{
        console.log("job failed");
        if(job){
            console.log(job.id);
        }
       };
}