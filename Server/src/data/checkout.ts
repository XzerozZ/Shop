import { Request, Response } from 'express';
import { client, Database } from '../server';
import { ObjectId } from "mongodb";

export const Checkout = async (req: Request, res: Response) => {
    await Database();
    try {
      const { userID, productID, totalAmout } = req.body;
  
        const product = Promise.all(productID?.map(async (item: any) => {
          return new ObjectId(item);
        }));
      const transaction = {
        userID,
        bookID: await product,
        totalAmout,
        date: new Date(),
      };
      const result = await client
      .db("Webpro")
      .collection("Transaction")
      .insertOne(transaction)
      .catch((error: any) => {
        console.log(error);
      });
    res.status(200).send({checkout: "success",data: result});
  } catch (error) {
    console.log(error);
  }
};