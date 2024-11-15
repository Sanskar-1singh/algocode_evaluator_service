"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const index_1 = __importDefault(require("./routes/index"));
const sampleWorker_1 = __importDefault(require("./workers/sampleWorker"));
const body_parser_1 = __importDefault(require("body-parser"));
const SubmissionWorker_1 = __importDefault(require("./workers/SubmissionWorker"));
const constant_1 = require("./utils/constant");
const SubmissionQueueProducers_1 = __importDefault(require("./producers/SubmissionQueueProducers"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use('/api', index_1.default);
app.listen(serverConfig_1.default.PORT, () => {
    console.log(`Server started at port ${serverConfig_1.default.PORT}`);
    (0, sampleWorker_1.default)('sampleQueue');
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
    const val = `10`;
    (0, SubmissionWorker_1.default)(constant_1.submission_queue);
    (0, SubmissionQueueProducers_1.default)({ "1234": {
            language: "CPP",
            val,
            code,
        } });
    // SubmissionWorker(submission_queue); 
    //runCpp(code,val);
});
