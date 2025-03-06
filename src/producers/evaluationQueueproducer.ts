import evaluationqueue from "../queues/evaluationQueue";


export default async function equeue(payload:Record<string,unknown>){
  
    await evaluationqueue.add("evaluationJob",payload);
    console.log("here is payload",payload);
    console.log("successfully added a new job");
}
