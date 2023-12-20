import { Request, Response } from 'express';
import { client , Database } from "../server";
import { ObjectId } from 'mongodb';

export const showtrans = async (req: Request, res: Response) => {
    try {
        await Database();
        const { userID } = req.params
        const result = await client.db("Webpro").collection("Transaction").aggregate([
            {
                $match: {
                    userID: userID
                }
            },
            {
                $lookup: {
                    from: "product",
                    localField: "productID",
                    foreignField: "_id",
                    as: "game"
                }
            },
           
        ]).toArray();
        res.status(200).send(result);
    }catch{
        res.status(500).send({ error: "Internal Server Error" });
    }
};