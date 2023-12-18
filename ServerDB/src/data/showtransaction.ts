import { Request, Response } from 'express';
import { dbConnect } from "../mysql";

export const showtrans = async (req: Request, res: Response) => {
    try {
        const client = await dbConnect();
        const { userID } = req.params;
        console.log('UserID:', userID);
        const data: any = await client.query('SELECT * FROM transaction WHERE User_Id = ?', [userID]);
        console.log('Fetched data:', data[0]);
        res.status(200).send(data[0]);
    }catch{
        res.status(500).send({ error: "Internal Server Error" });
    }
};