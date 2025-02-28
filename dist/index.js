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
const samplequeueProducer_1 = __importDefault(require("./producers/samplequeueProducer"));
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
    // SubmissionWorker(submission_queue);
    (0, sampleWorker_1.default)('samplequeue');
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 10' }, 10);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 900' }, 900);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 700' }, 700);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 500' }, 500);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 8' }, 8);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 20' }, 20);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar singh 1' }, 1);
    (0, samplequeueProducer_1.default)('sampleJobs', { name: 'sanskar 7' }, 7);
});
