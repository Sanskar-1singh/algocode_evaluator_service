import { Job } from "bullmq";

import  IJob  from "../types/bullMqjobDefination";
import { SubmisisonPayload } from "../types/SubmisisonPayload";
import runCpp from "../containers/runCppDocker";
import createExecutor from "../utils/ExecutorFactory";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";

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
                const key=Object.keys(this.payload)[0];
               const codeLanguage=this.payload[key].language;
               const code=this.payload[key].code;
               const inputTestcase=this.payload[key].inputCase;
                const strategy=createExecutor(codeLanguage);
                if(strategy!=null){
                    const response:ExecutionResponse=await strategy.execute(code,inputTestcase);
                    if(response.status=='completed'){
                        console.log("code executed successfully");
                        console.log(response);
                    }
                else{
                         console.log("something went wrong");
                         console.log(response);
                }
            }
        }
        };
       failure=(job?:Job):void =>{
        console.log("job failed");
        if(job){
            console.log(job.id);
        }
       };
}