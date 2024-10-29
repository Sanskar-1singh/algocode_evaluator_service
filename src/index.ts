import express from 'express';
import serverConfig from './config/serverConfig';

const app=express();
console.log("bye");
app.listen(serverConfig.PORT,()=>{
    console.log(`server started  at port ${serverConfig.PORT}`);
});
