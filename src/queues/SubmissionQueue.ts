import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig";

const Submissionqueue = new Queue('SubmissionQueue',{ connection:redisConnection});

export default Submissionqueue;
