import express, { Request, Response, NextFunction } from 'express';
import ConnectionManager from './domain/services/ConnectionManager';
import ValveManager from './domain/services/ValveManager';
import ConnectionRepository from './infrastructure/repository/ConnectionRepository';

const app = express();

const connectionRepository = new ConnectionRepository();

const valveManager = new ValveManager();
const connectionManager = new ConnectionManager({ connectionRepository });

app.listen(3000, () => {
    console.log('hello');
});

app.get('/valves', async (req: Request, res: Response) => {
    const connections = await connectionManager.getConnections();
    const valveStates = await valveManager.initializeValveConnections(connections);
    console.log(valveStates);
    res.json(valveStates);
});

