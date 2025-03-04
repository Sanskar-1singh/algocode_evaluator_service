import samplequeue from "../queues/samplequeue";

export default async function samplequeueProducer(name:string,payload:Record<string,unknown>,priority:number){
    await samplequeue.add(name,payload,{priority:priority});//its by default signature of .add function of adding in queue>>
    
    console.log("successfully added a new job");
}