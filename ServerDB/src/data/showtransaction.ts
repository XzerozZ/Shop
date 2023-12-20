import { Request, Response } from 'express';
import { dbConnect } from "../mysql";

export const showtrans = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        const result : any = await client.query(
            `SELECT Transaction_Id _id , totalAmount , Product.Product_Id Product_Id,Product.name name  FROM Transaction Left JOIN Product ON Transaction.Product_Id = Product.Product_Id WHERE User_Id = ?`,[id]
        );
        const trans = Array.isArray(result[0])
            ? result[0].reduce((acc: any, item: any) => {
                    const existingItem = acc.find((i: any) => i._id === item._id);
                    if (existingItem) {
                        existingItem.Product.push({
                            _id: String(item.Product_Id),
                            name: item.name
                        });
                    } else {
                        acc.push({
                            _id: item._id,
                            totalAmount: item.totalAmount,
                            date: item.date,
                            Product: [
                                {
                                    _id: String(item.Product_Id),
                                    name: item.name
                                },
                            ],
                        });
                    }
                    return acc;
                }, [])
            : []; 
        res.status(200).send(trans);
    } catch (error) {
       console.log(error);
        
    }
};