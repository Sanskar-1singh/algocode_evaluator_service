"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingCheck = void 0;
const pingCheck = (req, res) => {
    return res.status(200).json({ message: "pong" });
};
exports.pingCheck = pingCheck;
