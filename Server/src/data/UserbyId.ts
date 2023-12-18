import { Request, Response } from 'express';
import { client , Database } from "../server";

export const getUserbyID = async (req: Request, res: Response) => {
    try {
        await Database();
        const { userID } = req.params
        const result = await client.db("Webpro").collection('user').findOne({ _Id: userID });
        console.log('Fetched data:', result);
        res.status(200).send(result);
    }catch{
        res.status(500).send({ error: "Internal Server Error" });
    }
};