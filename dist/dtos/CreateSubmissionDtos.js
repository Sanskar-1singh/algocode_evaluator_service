"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmmissionZodSchema = void 0;
const zod_1 = require("zod");
;
exports.createSubmmissionZodSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    problemId: zod_1.z.string(),
    code: zod_1.z.string(),
    language: zod_1.z.string()
}).strict(); //here it will not allow extra properties in req.body it will throw error
