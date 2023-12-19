import { Request, Response } from 'express';
import { dbConnect } from "../mysql";

export const showtrans = async (req: Request, res: Response) => {
    try {
        const { userID } = req.query;
        const client = await dbConnect();
        const result = await client.query(
            `SELECT Transaction.* , Product.name , Product.price  FROM Transaction JOIN Product ON Transaction.Product_Id = Product.Product_Id WHERE User+Id = ?`,
            userID
        );
        const findgame = Array.isArray(result[0])
            ? result[0].reduce((acc: any, item: any) => {
                    const existingItem = acc.find((i: any) => i.Product_Id === item.Product_Id);
                    if (existingItem) {
                        existingItem.book.push({
                            Product_Id: Number(item.Product_Id),
                            name: item.name,
                            price: item.price,
                        });
                    } else {
                        acc.push({
                            Product_Id: item.Product_Id,
                            totalAmout: item.totalAmout,
                            date: item.date,
                            book: [
                                {
                                    Product_Id: Number(item.Product_Id),
                                    name: item.name,
                                    price: item.price,
                                },
                            ],
                        });
                    }
                    return acc;
                }, [])
            : [];
        res.status(200).send(findgame);
    } catch (error) {
       console.log(error);
        
    }
};