import { Job } from "bullmq";

 interface IJob{
    name:string
    payload?:Record<string,unknown>
    handle:(job?:Job)=>void
    failure:(job?:Job)=>void
    
}
export default  IJob;