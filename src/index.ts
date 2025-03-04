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
import submissionQueueProducers from './producers/SubmissionQueueProducers';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui',serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
    console.log(`bull board is running at ${serverConfig.PORT}/ui`);
    //  const code=`
    //  #include<bits/stdc++.h>
    //  using namespace std;

    //  int main(){
    //    int a;
    //    int b;
    //    int c,d,e,f,g;
    //    cin>>a;
    //    cin>>b;
    //    cin>>c;
    //    cin>>d;
    //    cin>>f;
    //    cin>>g;
    //    cout<<a+b+c+d+e+f+g<<" "; 
      
    //    for(int i=0;i<10;i++){
    //        cout<<i<<" ";
    //    }
    //  }
    //  `
    //  const test=`
    //  10
    //  20
    //  30
    //  40
    //  50
    //  60
    //  70
    //  `
      SubmissionWorker('SubmissionQueue');  
    //  submissionQueueProducers({'data':{
    //   language:'cpp',
    //    code:code,
    //    userId:'1',
    //    inputCase:'1',
    //    outputCase:'1',
    //    submissionId:'1'
    //    },
    //     'two':{
    //       language:'cpp',
    //       code:code,
    //       userId:'1',
    //       inputCase:'1',
    //       outputCase:'2',
    //       submissionId:'2'
    //     }
    //   });
    // runCpp(code,test);
});

/**
 * {
    "userId": "123456",
    "problemId": "675087dbae0ec274a91bed16",
    "code": "class Solution {\n    int missingNumber(int n) {\n        return n*n;    }\n}",
    "language": "java"
}

 */
