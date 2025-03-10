import express, { Router } from "express";
import {pingCheck } from "../../controllers/pingController";
import submissionRouter from "./submissionRouter";

const v1Router: Router = express.Router();

// Set up the route with the correct HTTP method
v1Router.use('/submission',submissionRouter);
v1Router.get('/ping', pingCheck);

export default v1Router;
