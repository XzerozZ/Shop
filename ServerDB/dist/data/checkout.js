"use strict";
/*import { Request, Response } from 'express';
import { client, Database } from '../server';
import { ObjectId } from "mongodb";

export const Checkout = async (req: Request, res: Response) => {
    await Database();
    try {
      const { userID, productID } = req.body;
  
        const product = Promise.all(productID?.map(async (item: any) => {
          return new ObjectId(item);
        }));
        const totalPriceAggregation = await client
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
            {
            $unwind: "$productinfo",
            },
            {
            $group: {
            _id: null,
            totalPrice: { $sum: "$productinfo.price" },
             },
            },
            {
            $project: {
            _id: 0,
            totalPrice: 1,
                },
            },
  ])
  .toArray();
      const totalAmount = totalPriceAggregation[0].totalPrice ;
      const transaction = {
        userID,
        productID: await product,
        totalAmount ,
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
};*/ 
