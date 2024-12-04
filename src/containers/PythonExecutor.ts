import doker from 'dockerode';

import createContainer from './containerFactory';
import { TestCases } from '../types/testCases';
import { PYTHON_IMAGE } from '../utils/constant';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullContainer';
import CodeExecutorStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
import { tryCatch } from 'bullmq';
class PythonExecutor implements CodeExecutorStrategy{
    async execute(code:string,inputTestcase:string):Promise<ExecutionResponse>{
        const rawlogBuffer:any[]=[];
        console.log('intialising docker container');
           //const pythonDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);
           await pullImage(PYTHON_IMAGE);
           const runCommand = `echo '${code.replace(/'/g, `'"'"'`)}' > test.py && echo '${inputTestcase.replace(/'/g, `'"'"'`)}' | python3 test.py`;
    
           const pythonDockerContainer=await createContainer(PYTHON_IMAGE,[
            '/bin/sh',
            '-c',
            runCommand
           ]);
            await pythonDockerContainer.start();
    
            console.log('started conatiner');
    
            const loggerStream=await pythonDockerContainer.logs({
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
            await pythonDockerContainer.remove();
             }

    
            await pythonDockerContainer.remove();
            
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


export default PythonExecutor;