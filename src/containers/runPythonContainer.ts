import doker from 'dockerode';

import createContainer from './containerFactory';
import { TestCases } from '../types/testCases';
import { PYTHON_IMAGE } from '../utils/constant';
import decodeDockerStream from './dockerHelper';
async function runPython(code:string,inputTestcase:string){
  
  const rawlogBuffer:any[]=[];
    console.log('intialising docker container');
       //const pythonDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);

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

        await pythonDockerContainer.remove();
}

export default runPython;