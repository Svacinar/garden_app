import { Request, Response, NextFunction } from "express";

import { ErrorModel } from "./errorModel";
import { ErrorException } from "./errorException";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorException) {
        res.status(err.status).send(err);
    } else {
        res.status(500).send({
            code: 'UnknownError',
            status: 500
        } as ErrorModel);
    }
}