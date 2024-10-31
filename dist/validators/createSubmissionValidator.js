"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "invalid request params recieved",
            data: {},
            error: error
        });
    }
};
exports.validate = validate;
