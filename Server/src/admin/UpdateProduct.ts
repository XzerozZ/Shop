import { Request, Response } from "express";
import { client, Database } from "../server";
import { ObjectId } from "mongodb";

export const UpdateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!price) {
      res.status(400).json({ error: "Bad Request: 'price' is required" });
      return;
    }

    await Database();

    const objectId = new ObjectId(id);

    const change = await client
      .db("Webpro")
      .collection("product")
      .updateOne({ _id: objectId }, { $set: { price } });

    console.log("ObjectId:", objectId);
    console.log("Update Result:", change);

    if (change.modifiedCount === 1) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res.status(404).json({ error: "Not Found: Document not updated" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};