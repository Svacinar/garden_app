import { Valve } from "../entities/valve";
import { IConnection } from "./IConnection";

interface IValveManager {
    initializeValveConnections(connections: Array<IConnection>): Promise<Record<string, Valve[]>>
    setTimer(timer: number): Promise<void>;
}

export {
    IValveManager,
}