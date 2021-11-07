import { Request, Response, NextFunction } from "express";
import { ILogger } from "../../domain/services/IServiceLogger";
import { ErrorException } from "./errorException";

export const makeNotFoundMiddleware = ({ logger }: { logger: ILogger }) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    logger.error('Method not found');
    const error = new ErrorException('NotFound');
    next(error);
}