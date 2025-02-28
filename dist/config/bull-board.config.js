"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter"); //to communicate  with bullMQ>>
const express_1 = require("@bull-board/express"); //to communicate with express>>
const api_1 = require("@bull-board/api");
const samplequeue_1 = __importDefault(require("../queues/samplequeue"));
const SubmissionQueue_1 = __importDefault(require("../queues/SubmissionQueue"));
const serverAdapter = new express_1.ExpressAdapter();
serverAdapter.setBasePath('/ui');
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(samplequeue_1.default),
        new bullMQAdapter_1.BullMQAdapter(SubmissionQueue_1.default)],
    serverAdapter,
});
exports.default = serverAdapter;
