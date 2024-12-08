"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containerFactory_1 = __importDefault(require("./containerFactory"));
const constant_1 = require("../utils/constant");
const dockerHelper_1 = __importDefault(require("./dockerHelper"));
const pullContainer_1 = __importDefault(require("./pullContainer"));
//TODO:migrate to strategy pattern>> 
function runCpp(code, inputTestcase) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawlogBuffer = [];
        console.log('intialising docker container');
        //const JavaDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);
        yield (0, pullContainer_1.default)(constant_1.CPP_IMAGE);
        const runCommand = `echo '${code.replace(/'/g, `'"'"'`)}' > main.cpp  && g++ main.cpp -o main && echo '${inputTestcase.replace(/'/g, `'"'"'`)}' | stdbuf -oL -eL ./main`;
        const CppDockerContainer = yield (0, containerFactory_1.default)(constant_1.CPP_IMAGE, [
            '/bin/sh',
            '-c',
            runCommand
        ]);
        yield CppDockerContainer.start();
        console.log('started conatiner');
        const loggerStream = yield CppDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true, //wheather log are streamed or returend as single string>>
        });
        //attach events on stream objects to start and stop reading>>
        loggerStream.on('data', (chunk) => {
            rawlogBuffer.push(chunk);
        });
        const response = yield new Promise((res) => {
            loggerStream.on('end', () => {
                console.log(rawlogBuffer);
                const completeBuffer = Buffer.concat(rawlogBuffer);
                const decodedStream = (0, dockerHelper_1.default)(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);
                res(decodedStream);
            });
        });
        yield CppDockerContainer.remove();
        return response;
    });
}
exports.default = runCpp;
