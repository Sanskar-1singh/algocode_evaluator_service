"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pingController_1 = require("../../controllers/pingController");
const submissionRouter_1 = __importDefault(require("./submissionRouter"));
const v1Router = express_1.default.Router();
// Set up the route with the correct HTTP method
v1Router.use('/submission', submissionRouter_1.default);
v1Router.get('/ping', pingController_1.pingCheck);
exports.default = v1Router;
