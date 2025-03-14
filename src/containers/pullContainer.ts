import Docker from 'dockerode';

export default async function pullImage(imagename:string):Promise<any>{
    try{
          const docker=new Docker();
           return new Promise((res,rej)=>{
               docker.pull(imagename,(err:Error,stream:NodeJS.ReadableStream)=>{
                if(err) throw err;
                 
                docker.modem.followProgress(stream,(err,response)=>err?rej(err):res(response),(event)=>{
                    console.log(event.status);
                });
               });
           });
    }catch(err){
            console.log(err); 
    }
}