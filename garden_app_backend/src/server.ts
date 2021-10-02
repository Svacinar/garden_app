import express, { Request, Response, NextFunction } from 'express';
import ConnectionManager from './domain/services/ConnectionManager';
import ValveManager from './domain/services/ValveManager';
import ConnectionRepository from './infrastructure/repository/ConnectionRepository';
import bodyParser from 'body-parser';
import { Logger } from './infrastructure/logger/logger';

const logger = new Logger(module);

const app = express();
app.use(bodyParser.json());

const connectionRepository = new ConnectionRepository();

const valveManager = new ValveManager();
const connectionManager = new ConnectionManager({ connectionRepository });

app.listen(3000, () => {
    logger.log('GARDEN_APP_API LISTENING ON PORT 3000');
});

app.get('/valves', async (req: Request, res: Response) => {
    try {
        const connections = await connectionManager.getConnections();
        const valveStates = await valveManager.initializeValveConnections(connections);
        res.json(valveStates);
    } catch (e: any) {
        console.error(e.message);
        res.json({});
    }
});
app.put('/timer', async (req: Request, res: Response) => {
    const timer = req.body.timer;
    await valveManager.setTimer(timer);
    res.status(204).send();
})

