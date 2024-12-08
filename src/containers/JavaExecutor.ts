import doker from 'dockerode';

import createContainer from './containerFactory';
import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from '../utils/constant';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullContainer';
import CodeExecutorStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
class JavaExecutor implements CodeExecutorStrategy{
   async  execute(code: string, inputTestcase: string,outputCase:string): Promise<ExecutionResponse> {
        const rawlogBuffer:any[]=[];
        console.log('intialising docker container');
           //const JavaDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);
          await pullImage(JAVA_IMAGE);
          console.log(outputCase);
          const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestcase.replace(/'/g, `'\\"`)}' | java Main`;
           const JavaDockerContainer=await createContainer(JAVA_IMAGE,[
            '/bin/sh',
            '-c',
            runCommand
           ]);
            await JavaDockerContainer.start();
    
            console.log('started conatiner');
    
            const loggerStream=await JavaDockerContainer.logs({
                stdout:true,
                stderr:true,
                timestamps:false,
                follow:true, //wheather log are streamed or returend as single string>>
            })
    
            //attach events on stream objects to start and stop reading>>
            loggerStream.on('data',(chunk)=>{
                rawlogBuffer.push(chunk);
            })
            try {
                const codeResponse:string=await this.fetchdecodedStream(loggerStream,rawlogBuffer)
                 return {output:codeResponse,status:"completed"};
              } catch (error) {
                 
                   return {output:error as string,status:"error"};
 
              }finally{ 
             await JavaDockerContainer.remove();
              }
             
     }
 
     fetchdecodedStream(loggerStream:NodeJS.ReadableStream,rawlogBuffer:Buffer[]):Promise<string>{
            return new Promise((res,rej)=>{
             loggerStream.on('end',()=>{
                 console.log(rawlogBuffer);
                 const completeBuffer=Buffer.concat(rawlogBuffer);
                 const decodedStream=decodeDockerStream(completeBuffer);
                 console.log(decodedStream);
                 console.log(decodedStream.stdout);
                   if(decodedStream.stderr){
                     rej(decodedStream.stderr);
                   }
                   else{
                     res(decodedStream.stdout);
                   }
             });
         });
    }
}


export default JavaExecutor;