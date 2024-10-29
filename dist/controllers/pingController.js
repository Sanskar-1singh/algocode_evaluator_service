"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pingCheck = (res) => {
    return res.status(200).json({
        message: "sanskar singh"
    });
};
exports.default = {
    pingCheck: pingCheck,
};
