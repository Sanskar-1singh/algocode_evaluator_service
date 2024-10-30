import express from 'express';
import serverConfig from './config/serverConfig';
import apiRouter from './routes/index';
import samplequeueProducer from './producers/samplequeueProducer';
import SampleWorker from './workers/sampleWorker';

const app = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
    SampleWorker('samplequeue')
    samplequeueProducer('sampleJobs',{
        name:"sanket",
        company:"microsoft",
        position:"sde 2",
        location:"BLR"
    });
});
