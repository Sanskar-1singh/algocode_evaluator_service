import express from 'express';
import serverConfig from './config/serverConfig';
import apiRouter from './routes/index';

const app=express();

app.use('/api',apiRouter);
app.listen(serverConfig.PORT,()=>{
    console.log(`server started  at port ${serverConfig.PORT}`);
});
