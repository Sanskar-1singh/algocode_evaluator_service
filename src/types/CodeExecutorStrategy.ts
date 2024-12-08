export default interface CodeExecutorStrategy{
    execute(code:string,inputTestCases:string,outputTestCase:string):Promise<ExecutionResponse>;
}

export type ExecutionResponse={output:string,status:string};