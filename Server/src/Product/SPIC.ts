import { Request, Response } from "express";
import { client} from "../server";

export const getproductinCart = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query;

    const matching = await client.db("Webpro").collection("Cart")
    .aggregate([
        {
          $match: {
            userID: userID as string
          },
        },
        {
          $lookup: {
            from: "product",
            localField: "productID",
            foreignField: "_id",
            as: "productinfo",
          },
        },
      ])
      .toArray();

    // Send the response with the retrieved product information
    res.status(200).send({ message: "Get Product in cart", matching });
  } catch (error) {
    // Handle errors and send an error response
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};