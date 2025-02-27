import JavaExecutor from "../containers/JavaExecutor";
import PythonExecutor from "../containers/PythonExecutor";
import CodeExecutorStrategy from "../types/CodeExecutorStrategy";

export default function createExecutor(codeLanguage:string):CodeExecutorStrategy | null{
    if(codeLanguage.toLowerCase()==="python"){
        return new PythonExecutor();
    }
    else if(codeLanguage.toLowerCase()==="java"){
        return new JavaExecutor();
    }
        else{
            return null;
        }
}
  // "build": "npx tsc",
    // "watch": "npx tsc -w",
    // "prestart": "npm run build",
    // "start": "npx nodemon dist/index.js",
    // "dev": "npx concurrently \"npm run watch\" \"npm start\""