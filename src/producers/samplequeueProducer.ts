import samplequeue from "../queues/samplequeue";

export default async  function(name:string,payload:Record<string,unknown>,priority:number){
    await samplequeue.add(name,payload,{priority});
    console.log("successfully added a new job");
}