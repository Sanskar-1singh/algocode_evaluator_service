import DockerStreamOutput from "../types/dockerOutputstream";
import { HEADER_SIZE } from "../utils/constant";

function decodeDockerStream(buffer:Buffer):DockerStreamOutput{
    let offset=0;//this variable keeps track of current position in the buffer while parsing

     const output:DockerStreamOutput={stdout:'',stderr:''};

     //loop until offset reaches the end of buffer

     while(offset<buffer.length){
        //channel is read from buffer and has value of type of stream

        const typeOfstream=buffer[offset];


        //this length variable hold the length of data frame/part of buffer where value is>>
         //we will read this variable on an offset of 4 bytes from the start of chunk
          const length=buffer.readUInt32BE(offset+4);
        
          //as now we have read header,we can move forward to the value of the chunk
           offset+= HEADER_SIZE;

        if (typeOfstream==1){
            //stdout stream
            output.stdout+=buffer.toString('utf-8',offset,offset+length);
        }
        if(typeOfstream==2){
            //stderr stream
            output.stderr+=buffer.toString('utf-8',offset,offset+length);
        }
        offset+=length;//move offset to next chunk>>
     }
     return output;
}

export default decodeDockerStream;