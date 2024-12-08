export default function CodeCreator(startingCode:string,middleCode:string,endCode:string):string{
    return `
       ${startingCode}

       ${middleCode}
    
        ${endCode}
    `
}

//for python the endcode will be empty string>>
//for java endcode will be empty string>>