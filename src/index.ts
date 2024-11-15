import express from 'express';
import serverConfig from './config/serverConfig';
import apiRouter from './routes/index';
import samplequeueProducer from './producers/samplequeueProducer';
import SampleWorker from './workers/sampleWorker';
import bodyParser from 'body-parser';
import runPython from './containers/runPythonContainer';
import runJava from './containers/runJavaDocker';
import runCpp from './containers/runCppDocker';
import SubmissionWorker from './workers/SubmissionWorker';
import { submission_queue } from './utils/constant';
import SubmissionQueueProducers from './producers/SubmissionQueueProducers';
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
    

    SampleWorker('sampleQueue');
    const code = `
    #include<iostream>
    using namespace std;
    int main(){
      int x;
      cin>>x;
      for(int i=0;i<x;i++){
      cout<<i<<" ";
      }
      cout<<endl;
      return 0;
    }
     `;

    const val=`10`;
    SubmissionWorker(submission_queue);
    

    SubmissionQueueProducers({"1234":{
          language:"CPP",
          val,
          code,
    }});
   // SubmissionWorker(submission_queue); 
    //runCpp(code,val);

    
});
