"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const index_1 = __importDefault(require("./routes/index"));
const samplequeueProducer_1 = __importDefault(require("./producers/samplequeueProducer"));
const sampleWorker_1 = __importDefault(require("./workers/sampleWorker"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use('/api', index_1.default);
app.listen(serverConfig_1.default.PORT, () => {
    console.log(`Server started at port ${serverConfig_1.default.PORT}`);
});
(0, sampleWorker_1.default)('samplequeue');
(0, samplequeueProducer_1.default)('sampleJobs', {
    name: "sanket",
    company: "microsoft",
    position: "sde 2",
    location: "BLR"
}, 2);
(0, samplequeueProducer_1.default)('sampleJobs', {
    name: "sanskar",
    company: "microsoft",
    position: "sde 2",
    location: "BLR"
}, 3);
(0, samplequeueProducer_1.default)('sampleJobs', {
    name: "sarthak",
    company: "microsoft",
    position: "sde 2",
    location: "BLR"
}, 1);
