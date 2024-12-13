import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig";

const Submissionqueue = new Queue('evaluationQueue',{ connection:redisConnection});

export default Submissionqueue;
