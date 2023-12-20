import { Request, Response } from "express";
import { dbConnect } from "../mysql"; // Assuming you have a database connection pool

export const AddtoCart = async (req: Request, res: Response) => {
    try {
      const { userID, productID } = req.query;
      const client = await dbConnect();
  
      if (!userID || !productID) {
        res.status(400).send({ message: "userID and productID are required in the query parameters." });
        return;
      }
  
      // Fetch User_Id from the users table
      const userResult: any = await client.query('SELECT User_Id FROM user WHERE User_Id = ?', [userID]);
      const userExists = userResult.length > 0;
  
      if (!userExists) {
        res.status(404).send({ error: "User not found" });
        return;
      }
  
      // Fetch Product_Id from the products table
      const productResult: any = await client.query('SELECT Product_Id FROM product WHERE Product_Id = ?', [productID]);
      const productExists = productResult.length > 0;
  
      if (!productExists) {
        res.status(404).send({ error: "Product not found" });
        return;
      }
  
      const result: any = await client.query('INSERT INTO Cart (User_Id, Product_Id) VALUES (?, ?)', [userID, productID]);

      // Check if result.rows is defined before accessing the property '0'
      const insertedRow = result.rows && result.rows.length > 0 ? result.rows[0] : null;
  
      res.status(200).send({ message: "Add to cart", result: insertedRow });
      console.log("Add to cart");
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal server error" });
    }
};

export const DeleteCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const client = await dbConnect();
    const result: any = await client.query('Delete from Cart where Cart_Id = ?',[id]);

      res.status(200).send({ message: "Deleted from cart", result: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
    console.log(error);
  }
};

export const DeleteItemCheckOut = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query;
    const client = await dbConnect();

    const result: any = await client.query('DELETE FROM Cart WHERE user_ID = ?', [userID]);

    res.status(200).send({ message: "Deleted from cart", result: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};