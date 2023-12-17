import { Request, Response } from "express";
import { client, Database } from "../server";
import { ObjectId } from "mongodb";

export const getGameByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).send("Bad Request: Missing 'id' parameter");
      return;
    }

    await Database();

    const matching = await client
      .db("Webpro")
      .collection("product")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id as string),
          },
        },
        {
          $lookup: {
            from: "dev",
            localField: "developer",
            foreignField: "_id",
            as: "developer_info",
          },
        },
        { $unwind: "$developer_info" },
        {
          $lookup: {
            from: "publisher",
            localField: "publisher",
            foreignField: "_id",
            as: "publisherInfo",
          },
        },
        { $unwind: "$publisherInfo" },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },
      ])
      .toArray();

    if (matching.length === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).send(matching);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};