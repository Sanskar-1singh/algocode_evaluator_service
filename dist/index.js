"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const SubmissionWorker_1 = __importDefault(require("./workers/SubmissionWorker"));
const bull_board_config_1 = __importDefault(require("./config/bull-board.config"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use('/api', index_1.default);
app.use('/ui', bull_board_config_1.default.getRouter());
app.listen(serverConfig_1.default.PORT, () => {
    console.log(`Server started at port ${serverConfig_1.default.PORT}`);
    console.log(`bull board is running at ${serverConfig_1.default.PORT}/ui`);
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
    (0, SubmissionWorker_1.default)('SubmissionQueue');
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
