import evaluationqueue from "../queues/evaluationQueue";


export default async  function(payload:Record<string,unknown>){
  
    await evaluationqueue.add("evaluationJobs",payload);
    console.log("here is payload",payload);
    console.log("successfully added a new job");
}