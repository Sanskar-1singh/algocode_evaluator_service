import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';//to communicate  with bullMQ>>
import {ExpressAdapter} from '@bull-board/express';//to communicate with express>>
import {createBullBoard} from '@bull-board/api';
import sampleQueue from '../queues/samplequeue';
import Submissionqueue from '../queues/SubmissionQueue';
import evaluationqueue from '../queues/evaluationQueue';
const serverAdapter=new ExpressAdapter();
serverAdapter.setBasePath('/ui');
createBullBoard({
queues:[new BullMQAdapter(sampleQueue),
    new BullMQAdapter(Submissionqueue),new BullMQAdapter(evaluationqueue)],
    serverAdapter,
});


export default serverAdapter;