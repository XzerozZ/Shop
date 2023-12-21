import { Request, Response } from 'express';
import { dbConnect } from '../mysql'; 
import { v4 as uuidv4 } from "uuid";

export const Checkout = async (req: Request, res: Response) => {
  try {
    const { userID, productID,totalAmount } = req.body;
    const id = uuidv4();
    const result = await Promise.all(productID?.map(async (item: any) => {
      const client = await dbConnect();
      await client.query(`INSERT INTO Transaction ( Transaction_Id,User_ID, Product_ID, totalAmount, date) VALUES (?,?,?,?,?)`, [ id,userID, item, totalAmount, new Date()]);
  }));
  res.status(200).send({
      checkout: "succsec",
      data: result,
  
  });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};