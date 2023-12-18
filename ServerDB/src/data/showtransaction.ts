import { Request, Response } from 'express';
import { dbConnect } from "../mysql";

export const showtrans = async (req: Request, res: Response) => {
    try {
        const client = await dbConnect();
        const { id } = req.params;
        console.log('UserID:', id);
        const data: any = await client.query('SELECT * FROM transaction WHERE User_Id = ?', [id]);
        console.log('Fetched data:', data[0]);
        res.status(200).send(data[0]);
    }catch{
        res.status(500).send({ error: "Internal Server Error" });
    }
};