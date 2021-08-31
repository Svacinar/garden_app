// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler } from 'next'

type Data = {
    name: string
}

const login: NextApiHandler = (req, res) => {
    res.status(200).json({
        server: 'ALIVE',
    });
}

export default login;