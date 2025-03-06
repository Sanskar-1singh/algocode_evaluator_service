import { Job } from "bullmq";

import  IJob  from "../types/bullMqjobDefination";
import  SubmisisonPayload from "../types/SubmisisonPayload";
import runCpp from "../containers/runCppDocker";
import createExecutor from "../utils/ExecutorFactory";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";
import evaluationQueueproducer from "../producers/evaluationQueueproducer";
import equeue from "../producers/evaluationQueueproducer";
export default class SubmissionJobs implements IJob{
        name:string;
        payload: Record<string, SubmisisonPayload>;
        constructor(payload:Record<string,SubmisisonPayload>){
            this.payload=payload;
            this.name=this.constructor.name;
        }
        handle=async(job?:Job)=>{
            console.log("handler of job called");
            console.log(this.payload);
            if(job){
                const key=Object.keys(this.payload)[0];
               const codeLanguage=this.payload[key].language;
               console.log(key);
               console.log(codeLanguage)
               const code=this.payload[key].code;
               const inputTestcase=this.payload[key].inputCase;
               const outputTestCase=this.payload[key].outputCase;
                const strategy=createExecutor(codeLanguage);
                console.log('strategy',strategy);
                if(strategy!=null){
                    const response:ExecutionResponse=await strategy.execute(code,inputTestcase,outputTestCase);
                    equeue({response,userId:this.payload[key].userId,submissionId:this.payload[key].submissionId});
                    if(response.status=='SUCCESS'){
                        console.log("code executed successfully");
                        console.log(response);
                    }
                else{
                         console.log("something went wrong");
                         console.log(response);
                }
            }
            else{
                console.log('something went wrong');
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