import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig";

const sampleQueue = new Queue('samplequeue',{ connection:redisConnection});

export default sampleQueue;
