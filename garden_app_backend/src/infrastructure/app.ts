import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { IConnection } from '../domain/interface/IConnection';
import { Valve } from '../domain/entities/valve';
import { ILogger } from '../domain/interface/ILogger';
import { IConnectionManager } from '../domain/interface/IConnection';
import { IValveManager } from '../domain/interface/IValveManager';
import { IJobDispatcher } from '../domain/interface/IJobDispatcher';

const buildApp = ({
    logger,
    connectionManager,
    valveManager,
    remoteJobDispatcher,
    errorMiddleware,
    reqresMiddleware,
    notFoundMiddleware,
}: {
    logger: ILogger,
    connectionManager: IConnectionManager,
    valveManager: IValveManager,
    remoteJobDispatcher: IJobDispatcher,
    errorMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => void,
    reqresMiddleware: (req: Request, res: Response, next: NextFunction) => void,
    notFoundMiddleware: (req: Request, res: Response, next: NextFunction) => void,
}) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(reqresMiddleware);

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
    app.get('/connection', async (req: Request, res: Response) => {
        const connections = connectionManager.getConnections();
        res.json(connections);
    })
    app.put('/connection', async (req: Request, res: Response) => {
        const connection: IConnection = {
            endpoint: req.body.endpoint,
            name: req.body.name
        };
        await connectionManager.saveConnection(connection);
        res.status(204).send();
    })

    app.post('/queue', async (req: Request, res: Response) => {
        req.body.valves.forEach((valve: Valve) => {
            const job = remoteJobDispatcher.createValveJob(valve);
            remoteJobDispatcher.addToQueue(job);
        });
        remoteJobDispatcher.processQueue();
        res.status(204).send();
    });

    app.delete('/queue', async (req: Request, res: Response) => {
        remoteJobDispatcher.cancelQueue();
        res.status(204).send();
    })

    app.use('*', notFoundMiddleware);

    app.use(errorMiddleware);

    return app;
}

export {
    buildApp,
};
