import { Request, Response } from 'express';
import { dbConnect } from '../mysql'; 

export const Checkout = async (req: Request, res: Response) => {
  try {
    const { userID, productID,totalAmount } = req.body;

    const result = await Promise.all(productID?.map(async (item: any) => {
      const client = await dbConnect();
      await client.query(`INSERT INTO Transaction ( User_ID, Product_ID, totalAmount, date) VALUES (?,?,?,?)`, [ userID, item, totalAmount, new Date()]);
  }));
  res.status(200).send({
      checkout: "succsec",
      data: result,
  
  });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};