import { Request, Response } from 'express';
import { dbConnect } from "../mysql";

export const showtrans = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        const result = await client.query(
            `SELECT Transaction.User_Id ,Transaction.Product_Id, Product.name  , Product.price  FROM Transaction Left JOIN Product ON Transaction.Product_Id = Product.Product_Id WHERE User_Id = ?`,[id]
        );
        res.status(200).send(result[0]);
    } catch (error) {
       console.log(error);
        
    }
};