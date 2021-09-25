import axios from 'axios';
import { NextApiHandler } from 'next'

type Data = {
    name: string
}

const getValvesData: NextApiHandler = async (req, res) => {
    const result = await axios.get(`${process.env.BACKEND_API_URL}/valves`);
    res.status(200).send(result.data);
}

export default getValvesData