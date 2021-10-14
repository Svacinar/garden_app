import axios from 'axios';
import { NextApiHandler } from 'next'


const startQueue: NextApiHandler = async (req, res) => {
    try {
        await axios.post(`${process.env.BACKEND_API_URL}/queue`, req.body);
        res.status(204).json({});
    } catch (e) {
        console.log(e.message);
    }
}

export default startQueue