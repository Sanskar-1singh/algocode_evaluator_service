import express from 'express';
import serverConfig from './config/serverConfig';
import apiRouter from './routes/index';
import samplequeueProducer from './producers/samplequeueProducer';
import SampleWorker from './workers/sampleWorker';
import bodyParser from 'body-parser';
import runPython from './containers/runPythonContainer';
import runJava from './containers/runJavaDocker';
import runCpp from './containers/runCppDocker';

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
    runCpp(code,val);

    
});
