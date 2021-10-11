import * as dotenv from 'dotenv';

dotenv.config();

if (process.env.PORT === undefined || process.env.DELAY_BETWEEN_REMOTE_JOBS_MS === undefined) {
    throw new Error('Type error');
}

export default {
    PORT: parseInt(process.env.PORT) ?? 3000,
    DELAY_BETWEEN_REMOTE_JOBS_MS: isNaN(parseInt(process.env.DELAY_BETWEEN_REMOTE_JOBS_MS)) ? 5000 : parseInt(process.env.DELAY_BETWEEN_REMOTE_JOBS_MS),
};