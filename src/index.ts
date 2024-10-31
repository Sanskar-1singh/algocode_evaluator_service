import express from 'express';
import serverConfig from './config/serverConfig';
import apiRouter from './routes/index';
import samplequeueProducer from './producers/samplequeueProducer';
import SampleWorker from './workers/sampleWorker';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
    
});
SampleWorker('samplequeue')
    samplequeueProducer('sampleJobs',{
        name:"sanket",
        company:"microsoft",
        position:"sde 2",
        location:"BLR"
    },2);
    samplequeueProducer('sampleJobs',{
        name:"sanskar",
        company:"microsoft",
        position:"sde 2",
        location:"BLR"
    },3);
    samplequeueProducer('sampleJobs',{
        name:"sarthak",
        company:"microsoft",
        position:"sde 2",
        location:"BLR"
    },1);