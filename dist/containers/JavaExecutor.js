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
class JavaExecutor {
    execute(code, inputTestcase, outputCase) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawlogBuffer = [];
            console.log('intialising docker container');
            //const JavaDockerContainer=await createContainer(PYTHON_IMAGE,['python3','-c',code,'stty -echo']);
            yield (0, pullContainer_1.default)(constant_1.JAVA_IMAGE);
            console.log(outputCase);
            const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestcase.replace(/'/g, `'\\"`)}' | java Main`;
            const JavaDockerContainer = yield (0, containerFactory_1.default)(constant_1.JAVA_IMAGE, [
                '/bin/sh',
                '-c',
                runCommand
            ]);
            yield JavaDockerContainer.start();
            console.log('started conatiner');
            const loggerStream = yield JavaDockerContainer.logs({
                stdout: true,
                stderr: true,
                timestamps: false,
                follow: true, //wheather log are streamed or returend as single string>>
            });
            //attach events on stream objects to start and stop reading>>
            loggerStream.on('data', (chunk) => {
                rawlogBuffer.push(chunk);
            });
            try {
                const codeResponse = yield this.fetchdecodedStream(loggerStream, rawlogBuffer);
                if (codeResponse.trim() === outputCase.trim()) {
                    return { output: codeResponse, status: "SUCCESS" };
                }
                else {
                    return { output: codeResponse, status: "WA" };
                }
            }
            catch (error) {
                console.log('error occured', error);
                if (error === 'TLE') {
                    yield JavaDockerContainer.kill();
                }
                return { output: error, status: "error" };
            }
            finally {
                yield JavaDockerContainer.remove();
            }
        });
    }
    fetchdecodedStream(loggerStream, rawlogBuffer) {
        return new Promise((res, rej) => {
            const timeout = setTimeout(() => {
                console.log('timeout called');
                rej('TLE');
            }, 2000);
            loggerStream.on('end', () => {
                //this callback execute when stream ends
                clearTimeout(timeout);
                console.log(rawlogBuffer);
                const completeBuffer = Buffer.concat(rawlogBuffer);
                const decodedStream = (0, dockerHelper_1.default)(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);
                if (decodedStream.stderr) {
                    rej(decodedStream.stderr);
                }
                else {
                    res(decodedStream.stdout);
                }
            });
        });
    }
}
exports.default = JavaExecutor;
