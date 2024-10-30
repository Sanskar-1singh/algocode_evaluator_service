import express from "express";
import router from "./v1/index";

const apiRouter = express.Router();

apiRouter.use('/v1', router);

export default apiRouter;
