import Submissionqueue from "../queues/SubmissionQueue";
import  SubmisisonPayload  from "../types/SubmisisonPayload";

export default async  function submissionQueueProducers(payload:Record<string,SubmisisonPayload>){
    await Submissionqueue.add("SubmissionJobs",payload);
    console.log("successfully added a new job");
}