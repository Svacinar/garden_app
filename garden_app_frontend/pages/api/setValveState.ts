import axios from 'axios';
import { NextApiHandler } from 'next'

const setValveState: NextApiHandler = async (req, res) => {
    const endpoint: string = req.body.endpoint;
    const newValveState: Record<string, any> = req.body.newValveState;
    try {
        const result = await axios.post(`http://${endpoint}/valve`, newValveState);
        res.status(200).send(result.data);
    } catch (error: any) {
        let message;
        if (error.message) {
            message = error.message
        }
        res.status(500).send({
            error: message
        });
    }
}
export default setValveState