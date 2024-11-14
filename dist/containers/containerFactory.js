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
const dockerode_1 = __importDefault(require("dockerode"));
function createContainer(imagename, cmdExecutable) {
    return __awaiter(this, void 0, void 0, function* () {
        const docker = new dockerode_1.default();
        const container = yield docker.createContainer({
            Image: imagename,
            Cmd: cmdExecutable,
            AttachStdin: true, //to enable input stream
            AttachStdout: true, //te enable output stream
            AttachStderr: true, //to enable the error stream
            Tty: false,
            OpenStdin: true, //keep the input stream open even when no interaction is open
        });
        return container;
    });
}
exports.default = createContainer;
