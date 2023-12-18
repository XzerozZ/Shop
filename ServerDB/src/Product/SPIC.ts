import { Response, Request } from "express";
import { dbConnect } from "../mysql";
export const getproductinCart = async (req: Request, res: Response) => {
    try {
        const client = await dbConnect();
        const { userID } = req.query;
        const result : any = await client.query('SELECT * FROM cart WHERE User_Id =?', [userID]);
        res.status(200).send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
};