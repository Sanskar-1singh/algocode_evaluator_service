export default function pythonCodeCreator(startingCode:string,middleCode:string,endCode:string){
    return `
       ${startingCode}

       ${middleCode}
    
        ${endCode}
    `
}