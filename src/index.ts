import express from 'express';
import serverConfig from './config/serverConfig';
import apiRouter from './routes/index';
import SampleWorker from './workers/sampleWorker';
import bodyParser from 'body-parser';
import runPython from './containers/PythonExecutor';
import runJava from './containers/JavaExecutor';
import runCpp from './containers/runCppDocker';
import SubmissionWorker from './workers/SubmissionWorker';
import { submission_queue } from './utils/constant';
import SubmissionQueueProducers from './producers/SubmissionQueueProducers';
import samplequeueProducer from './producers/samplequeueProducer';
import serverAdapter from './config/bull-board.config';
import sampleQueue from './queues/samplequeue';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui',serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
    console.log(`bull board is running at ${serverConfig.PORT}/ui`);
  // SubmissionWorker(submission_queue);
   SampleWorker('samplequeue');
    samplequeueProducer('sampleJobs',{name:'sanskar 10'},10);
    samplequeueProducer('sampleJobs',{name:'sanskar 900'},900);
    samplequeueProducer('sampleJobs',{name:'sanskar 700'},700);
    samplequeueProducer('sampleJobs',{name:'sanskar 500'},500);
    samplequeueProducer('sampleJobs',{name:'sanskar 8'},8);
    samplequeueProducer('sampleJobs',{name:'sanskar 20'},20);
    samplequeueProducer('sampleJobs',{name:'sanskar singh 1'},1);
    samplequeueProducer('sampleJobs',{name:'sanskar 7'},7);
});
