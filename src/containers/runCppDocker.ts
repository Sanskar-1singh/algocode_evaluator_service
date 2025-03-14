import doker from 'dockerode';

import createContainer from './containerFactory';
import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utils/constant';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullContainer';

 //TODO:migrate to strategy pattern>> 

async function runCpp(code:string,inputTestcase:string){
  
  const rawlogBuffer:any[]=[];
    console.log('intialising docker container');
       //const JavaDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);
         await pullImage(CPP_IMAGE);
       const runCommand = `echo '${code.replace(/'/g, `'"'"'`)}' > main.cpp  && g++ main.cpp -o main && echo '${inputTestcase.replace(/'/g, `'"'"'`)}' | ./main`;

       const CppDockerContainer=await createContainer(CPP_IMAGE,[
        '/bin/sh',
        '-c',
        runCommand
       ]);
        await CppDockerContainer.start();

        console.log('started conatiner');

        const loggerStream=await CppDockerContainer.logs({
            stdout:true,
            stderr:true,
            timestamps:false,
            follow:true, //wheather log are streamed or returend as single string>>
        })

        //attach events on stream objects to start and stop reading>>
        loggerStream.on('data',(chunk)=>{
            rawlogBuffer.push(chunk);
        })

      const response= await new Promise((res)=>{
            loggerStream.on('end',()=>{
                console.log(rawlogBuffer);
                const completeBuffer=Buffer.concat(rawlogBuffer);
                const decodedStream=decodeDockerStream(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);
                res(decodedStream);
            });
        });

        await CppDockerContainer.remove();
        return response;
}

export default runCpp;