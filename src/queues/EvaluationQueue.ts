    import { Queue } from "bullmq";
    import redisConnection from "../config/redisConfig";

    const evaluationqueue = new Queue('evaluationQueue',{ connection:redisConnection});

    export default evaluationqueue;
