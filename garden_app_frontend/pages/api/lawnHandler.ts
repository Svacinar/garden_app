import axios from 'axios';
import { NextApiHandler } from 'next'

type Data = {
    name: string
}

const login: NextApiHandler = async (req, res) => {
    const result = await axios.get('http://localhost:3000/valves');
    res.status(200).send(result.data);
}

export default login;