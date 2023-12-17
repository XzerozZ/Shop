import { Request, Response } from "express";
import { client,Database} from "../server";
export const getproductinCart = async (req: Request, res: Response) => {
  try {
    await Database();
    const { userID } = req.query
    const matching = await client
  .db("Webpro")
  .collection("Cart")
  .aggregate([
    {
      $match: {
        userID: userID as string,
      },
    },
    {
      $addFields: {
        productIDObjectId: { $toObjectId: "$productID" },
      },
    },
    {
      $lookup: {
        from: "product",
        localField: "productIDObjectId",
        foreignField: "_id",
        as: "productinfo",
      },
    },
    {$unwind: "$productinfo",},
    
    {
      $project: {
        productIDObjectId: 0, // Exclude the temporary field from the final result if desired
      },
    },
  ])
  .toArray();
    res.status(200).send({ matching });
  } catch (error) {
    // Handle errors and send an error response
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};