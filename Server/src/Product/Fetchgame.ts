import { Request, Response } from 'express';
import { client, Database } from '../server';

export const Fetchgame = async (req: Request, res: Response) => {
    try {
        await Database();
        const result = await client
        .db("Webpro")
        .collection("product")
        .aggregate([
          {
            $lookup: {
              from: "dev",
              localField: "developer",
              foreignField: "_id",
              as: "author_name"
            },
          },
          {
            $lookup: {
              from: "publisher",
              localField: "publisher",
              foreignField: "_id",
              as: "publisherInfo",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "categoryDetails",
            },
          },
        ])
        .toArray();
      res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
};