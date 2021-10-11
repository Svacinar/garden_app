import express, { Request, Response, } from 'express';
import ConnectionManager from './domain/services/ConnectionManager';
import ValveManager from './domain/services/ValveManager';
import ConnectionRepository from './infrastructure/repository/ConnectionRepository';
import { RemoteJobDispatcher } from './domain/services/RemoteJobDispatcher';
import bodyParser from 'body-parser';
import { Logger } from './infrastructure/logger/logger';
import { Valve } from './domain/entities/valve';

const logger = new Logger(module);

const app = express();
app.use(bodyParser.json());

const connectionRepository = new ConnectionRepository();

const valveManager = new ValveManager();
const connectionManager = new ConnectionManager({ connectionRepository });

const remoteJobDispatcher = new RemoteJobDispatcher(logger); //TODO module name

app.listen(3000, () => {
    logger.log('GARDEN_APP_API LISTENING ON PORT 3000');
});

app.get('/valves', async (req: Request, res: Response) => {
    try {
        const connections = await connectionManager.getConnections();
        const valveStates = await valveManager.initializeValveConnections(connections);
        res.json(valveStates);
    } catch (e: any) {
        logger.error(e.message);
        res.json({});
    }
});
app.put('/timer', async (req: Request, res: Response) => {
    const timer = req.body.timer;
    await valveManager.setTimer(timer);
    res.status(204).send();
})

app.post('/queue', async (req: Request, res: Response) => {
    logger.info(JSON.stringify(req.body));
    req.body.valves.forEach((valve: Valve) => {
        const job = remoteJobDispatcher.createValveJob(valve);
        remoteJobDispatcher.addToQueue(job);
    });
    remoteJobDispatcher.processQueue();
    res.status(204).send();
});

