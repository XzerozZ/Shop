import { Request, Response } from "express";
import { client, Database } from "../server";
import { ObjectId } from "mongodb";

export const AddtoCart = async (req: Request, res: Response) => {
  try {
    await Database();
    const { userID, productID } = req.query;
    if (!userID || !productID) {
      res.status(400).send({ message: "userID and productID are required in the query parameters." });
      return;
    }
    
    const data = {
      userID: userID as string,
      productID: productID as string,
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
export const DeleteCart = async (req: Request, res: Response) => {
  try {
    await Database();
    const { id } = req.query;

    const deleteCart = await client
      .db("Webpro")
      .collection("Cart")
      .deleteOne({_id:new ObjectId(id as string)});

    if (deleteCart.deletedCount === 1) {
      res.status(200).send({ message: "Deleted from cart", deleteCart });
    } else {
      res.status(404).send({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
export const DeleteItemCheckOut = async (req: Request, res: Response) => {
  try {
    await Database();
    const { userID } = req.query;
    const result = await client
    .db("Webpro")
      .collection("Cart")
      .deleteMany({userID:userID});
      res.status(200).send({ message: "Deleted from cart", result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};