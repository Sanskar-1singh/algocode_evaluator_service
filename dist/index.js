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
const runPythonContainer_1 = __importDefault(require("./containers/runPythonContainer"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use('/api', index_1.default);
app.listen(serverConfig_1.default.PORT, () => {
    console.log(`Server started at port ${serverConfig_1.default.PORT}`);
    (0, sampleWorker_1.default)('sampleQueue');
    const code = `x = input()
print("value of x is ",x)
y=input()
print("value of y is",y)
    `;
    const val = `100 
200`;
    (0, runPythonContainer_1.default)(code, val);
});
