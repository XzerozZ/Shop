import { Request, Response } from 'express';
import { dbConnect } from '../mysql'; 

export const Checkout = async (req: Request, res: Response) => {
  try {
    const { userID, productID,totalAmount } = req.body;
    const client = dbConnect();
    const productIDArray = productID.map((item: any) => parseInt(item, 10));
    const currentDate = new Date();
    const result:any = await client.query('INSERT INTO Transaction (User_ID, Product_ID, totalAmount, date)VALUES (?, ?, ?, ?)', [userID, JSON.stringify(productIDArray), totalAmount, currentDate]);

    res.status(200).send({ checkout: "success", data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};