import axios from 'axios';
import { NextApiHandler } from 'next'

const setTimer: NextApiHandler = async (req, res) => {
    const timer: number = req.body.timer;
    const timerInMs = timer * 1000 * 60;
    try {
        await axios.put(`${process.env.BACKEND_API_URL}/timer`, {
            timer: timerInMs,
        });
        res.status(204).json({});
    } catch (error: any) {
        console.error(error);
    }
}
export default setTimer;