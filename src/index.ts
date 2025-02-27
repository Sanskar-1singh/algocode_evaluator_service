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
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
  // SubmissionWorker(submission_queue);
   SampleWorker('samplequeue');
    samplequeueProducer('sampleJobs',{name:'sanskar'},10);
});
