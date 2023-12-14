import { Request, Response } from 'express';
import { client, Database } from '../server';

export const AddCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await Database();
    if (!name) {
      res.status(400).send({ message: "Enter the name of category" });
      return false;
    }
    const find = await client.db("Webpro").collection("catagory").findOne({ name });
    if (find) {
      res.status(400).send({ message: "Catagory already exists" });
      return false;
    }
    const result = await client.db("Webpro").collection("category").insertOne({ name });
    res.status(200).send({ result });
  } catch (error) {
    console.log("Error", error);
  }
};