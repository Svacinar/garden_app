import ConnectionManager from './domain/services/ConnectionManager';
import ValveManager from './domain/services/ValveManager';
import RemoteJobDispatcher from './domain/services/RemoteJobDispatcher';

import { Logger } from './infrastructure/logger/logger';
import ConnectionRepository from './infrastructure/repository/InMemoryConnectionRepository';
import { buildApp } from './infrastructure/app';

import { makeNotFoundMiddleware } from './infrastructure/middleware/notFoundMiddleware';
import { errorMiddleware } from './infrastructure/middleware/errorMiddleware';
import { makeReqresMiddleware } from './infrastructure/middleware/reqresMiddleware';

const logger = new Logger(module);

const connectionRepository = new ConnectionRepository();

const valveManager = new ValveManager();
const connectionManager = new ConnectionManager({ connectionRepository });

const remoteJobDispatcher = new RemoteJobDispatcher(logger); //TODO module name

const notFoundMiddleware = makeNotFoundMiddleware({ logger });
const reqresMiddleware = makeReqresMiddleware({ logger });

const app = buildApp({
    logger,
    valveManager,
    connectionManager,
    remoteJobDispatcher,
    notFoundMiddleware,
    reqresMiddleware,
    errorMiddleware,
})

app.listen(3000, () => {
    logger.log('GARDEN_APP_API LISTENING ON PORT 3000');
});
