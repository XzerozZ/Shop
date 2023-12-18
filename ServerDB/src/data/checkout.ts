import { Request, Response } from 'express';
import { dbConnect } from '../mysql'; 

export const Checkout = async (req: Request, res: Response) => {
  try {
    const { userID, productID } = req.body;
    const client = dbConnect();
    const productIDArray = productID.map((item: any) => parseInt(item, 10));
    const currentDate = new Date();
    const totalAmountResult:any = await client.query(`SELECT SUM(price) AS totalPriceFROM productWHERE _id IN (${productIDArray.join(',')})`);
    const totalAmount = totalAmountResult.rows[0]?.totalPrice || 0;
    const result:any = await client.query('INSERT INTO Transaction (userID, productID, totalAmount, date)VALUES (?, ?, ?, ?)', [userID, JSON.stringify(productIDArray), totalAmount, currentDate]);

    res.status(200).send({ checkout: "success", data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};