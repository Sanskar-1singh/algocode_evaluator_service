"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createExecutor;
const JavaExecutor_1 = __importDefault(require("../containers/JavaExecutor"));
const PythonExecutor_1 = __importDefault(require("../containers/PythonExecutor"));
function createExecutor(codeLanguage) {
    if (codeLanguage.toLowerCase() === "python") {
        return new PythonExecutor_1.default();
    }
    else if (codeLanguage.toLowerCase() === "java") {
        return new JavaExecutor_1.default();
    }
    else {
        return null;
    }
}
// "build": "npx tsc",
// "watch": "npx tsc -w",
// "prestart": "npm run build",
// "start": "npx nodemon dist/index.js",
// "dev": "npx concurrently \"npm run watch\" \"npm start\""
