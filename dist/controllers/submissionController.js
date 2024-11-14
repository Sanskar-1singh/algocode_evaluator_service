"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubmission = void 0;
const addSubmission = (req, res, __) => {
    const submissionDto = req.body;
    res.status(201).json({
        success: true,
        error: {},
        message: "Successfully collected the submission",
        data: submissionDto,
    });
};
exports.addSubmission = addSubmission;
