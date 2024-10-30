import samplequeue from "../queues/samplequeue";

export default async  function(name:string,payload:Record<string,unknown>){
    await samplequeue.add(name,payload);
    console.log("successfully added a new job");
}