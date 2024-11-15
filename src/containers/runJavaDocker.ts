import doker from 'dockerode';

import createContainer from './containerFactory';
import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from '../utils/constant';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullContainer';
async function runJava(code:string,inputTestcase:string){
  
  const rawlogBuffer:any[]=[];
    console.log('intialising docker container');
       //const JavaDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);
      await pullImage(JAVA_IMAGE);
       const runCommand = `echo '${code.replace(/'/g, `'"'"'`)}' > Main.java && javac Main.java && echo '${inputTestcase.replace(/'/g, `'"'"'`)}' | java Main`;

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

        await new Promise((res)=>{
            loggerStream.on('end',()=>{
                console.log(rawlogBuffer);
                const completeBuffer=Buffer.concat(rawlogBuffer);
                const decodedStream=decodeDockerStream(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);
                res(decodeDockerStream)
            });
        });

        await JavaDockerContainer.remove();
}

export default runJava;