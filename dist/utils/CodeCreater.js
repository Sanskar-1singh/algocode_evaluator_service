"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CodeCreator;
function CodeCreator(startingCode, middleCode, endCode) {
    return `
       ${startingCode}

       ${middleCode}
    
        ${endCode}
    `;
}
//for python the endcode will be empty string>>
//for java endcode will be empty string>>
