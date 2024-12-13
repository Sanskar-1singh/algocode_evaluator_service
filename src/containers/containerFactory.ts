import Docker from 'dockerode';

async function createContainer(imagename:string,cmdExecutable:string[]){
    const docker=new Docker();
    const container=await docker.createContainer({
        Image:imagename,
        Cmd:cmdExecutable,
        AttachStdin:true,//to enable input stream
        AttachStdout:true,//te enable output stream
        AttachStderr:true,//to enable the error stream
        Tty:false,
        HostConfig:{
           Memory:1024*1024*1024//1GB
        },
        OpenStdin:true,//keep the input stream open even when no interaction is open
    });
    return container;
}

export default createContainer;