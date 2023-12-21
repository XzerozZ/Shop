import { Response, Request } from "express";
import { dbConnect } from "../mysql";
export const getproductinCart = async (req: Request, res: Response) => {
    try {
        const client = await dbConnect();
        const { userID } = req.query;
        const result : any = await client.query('SELECT * FROM cart left join Product on Cart.Product_Id = Product.Product_Id  WHERE User_Id =?', [userID]);
        const matching = result[0].map((item: any) => ({
            _id: item.Cart_Id,
            userID: item.User_Id,
            productID: item.Product_Id,
            productinfo: {
              _id : item.Product_Id,
              name: item.name,
              price: item.price,
              date: item.release_date
            },
          }));
        res.status(200).send(matching);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
};