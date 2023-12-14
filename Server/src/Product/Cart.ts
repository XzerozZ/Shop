import { Request, Response } from "express";
import { client, Database } from "../server";
import { ObjectId } from "mongodb";

export const AddtoCart = async (req: Request, res: Response) => {
  try {
    await Database();
    const { userID, productID } = req.query;
    const data = {
      userID: new ObjectId(String(userID)),
      productID: new ObjectId(String(productID)),
    };
    const result = await client
      .db("Webpro")
      .collection("Cart")
      .insertOne(data);
    res.status(200).send({ message: "Add to cart", result: result });
    console.log("Add to cart");
  } catch (error) {
    console.log(error);
  }
};