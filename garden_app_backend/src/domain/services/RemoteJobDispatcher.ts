import axios from "axios";
import { ILogger } from './IServiceLogger';
import { timeout } from "../../infrastructure/utilities/utils";
import { Valve } from "../entities/valve";
import config from '../../config/config';

interface Job {
    endpoint: string,
    execute: () => Promise<void>,
};

class RemoteJobDispatcher {
    queue: Job[];
    processing: boolean;
    logger: ILogger;

    constructor(logger: ILogger) {
        this.queue = [];
        this.processing = false;
        this.logger = logger;
    };

    async processQueue() {
        if (this.processing) {
            this.logger.warn('Queue processing already started.');
            return;
        }
        this.processing = true;
        while (this.queue.length > 0) {
            const job = this.queue.shift();
            if (!job) {
                return;
            }
            await this.dispatchJob(job);
        }
        this.processing = false;
    }

    cancelQueue() {
        this.queue = [];
        this.logger.info('Queue cleared');
    }

    async dispatchJob(job: Job) {
        try {
            await job.execute();
        } catch (error: any) {
            this.logger.error(error.message);
        }
    }

    addToQueue(job: Job) {
        this.queue.push(job);
        this.logger.log(`${JSON.stringify(job)} added to queue`);
    }

    createValveJob(valve: Valve) {
        const job: Job = {
            endpoint: valve.endpoint,
            execute: async () => {
                this.logger.log(valve.endpoint);
                const requestBody = {
                    valveId: valve.name.split('valve')[1],
                    state: 1,
                    timer: valve.timer,
                };
                this.logger.info(`Requested remote job parameters: ${JSON.stringify(requestBody)}`);
                await axios.post(`http://${valve.endpoint}`, requestBody);
                await timeout(valve.timer + config.DELAY_BETWEEN_REMOTE_JOBS_MS);
                this.logger.info(`Job for valve ${requestBody.valveId} finished sucessfuly`);
            }
        };
        return job;
    }
}

export { RemoteJobDispatcher, Job as IJob }

export default RemoteJobDispatcher;