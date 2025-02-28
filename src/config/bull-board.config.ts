import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';//to communicate  with bullMQ>>
import {ExpressAdapter} from '@bull-board/express';//to communicate with express>>
import {createBullBoard} from '@bull-board/api';
import sampleQueue from '../queues/samplequeue';
import Submissionqueue from '../queues/SubmissionQueue';
const serverAdapter=new ExpressAdapter();
serverAdapter.setBasePath('/ui');
createBullBoard({
queues:[new BullMQAdapter(sampleQueue),
    new BullMQAdapter(Submissionqueue)],
    serverAdapter,
});


export default serverAdapter;