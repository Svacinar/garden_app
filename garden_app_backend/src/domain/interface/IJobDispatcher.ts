import { Valve } from "../entities/valve";

interface IJob {
    endpoint: string,
    execute: () => Promise<void>,
};

interface IJobDispatcher {
    processQueue(): Promise<void>;
    cancelQueue(): void;
    dispatchJob(job: IJob): Promise<void>;
    addToQueue(job: IJob): void;
    createValveJob(valve: Valve): IJob;
}

export {
    IJob,
    IJobDispatcher,
}