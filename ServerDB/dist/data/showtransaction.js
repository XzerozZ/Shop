"use strict";
/*import { Request, Response } from 'express';
import { client , Database } from "../server";

export const showtrans = async (req: Request, res: Response) => {
    try {
        await Database();
        const { userID } = req.params
        const result = await client.db("Webpro").collection('Transaction').find({ userId: userID }).toArray();
        console.log('Fetched data:', result);
        res.status(200).send(result);
    }catch{
        res.status(500).send({ error: "Internal Server Error" });
    }
};*/ 
