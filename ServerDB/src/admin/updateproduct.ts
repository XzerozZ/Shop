import { Request, Response } from "express";
import { dbConnect } from "../mysql";


export const UpdateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const client = await dbConnect();
    if (!price) {
      res.status(400).json({ error: "Bad Request: 'price' is required" });
      return;
    }

    const result: any = await client.query(`UPDATE product SET price = ? WHERE Product_Id =  ?`,[price,id]);

    console.log("Update Result:", result);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Not Found: Document not updated" });
    } else {
      res.status(200).json({ message : "Update successful" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};