import { Request, Response, NextFunction } from "express";
import { Logger } from "../logger/logger";
import { performance } from 'perf_hooks';

export const makeReqresMiddleware = ({ logger }: { logger: Logger }) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const t0 = performance.now();
    logger.log(`Request start: /${req.method} ${req.url}`);
    res.on('finish', () => {
        logger.log(`Request end: /${req.method} ${req.url}. Request processing took ${(performance.now() - t0).toFixed(2)} ms`);
    });
    next();
}