"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER_SIZE = exports.PYTHON_IMAGE = void 0;
exports.PYTHON_IMAGE = "python:3.9.20";
//this will represent the header sizze of docker stream
//docker stream header will contain data about type of  stream i.e. stdout/stderr??
//and length of data>>
exports.HEADER_SIZE = 8;
