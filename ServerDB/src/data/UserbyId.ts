import { Response,Request } from "express";
import { dbConnect } from "../mysql";
export const getUserbyID = async (req: Request, res: Response) => {
    try {
    const client = await dbConnect();
    const { id } = req.query;
    if (!id) {
      res.status(400).send("Bad Request: Missing 'id' parameter");
      return;
    }
    const result : any = await client.query(`
    SELECT distinct * FROM user
    Where User_Id = ?;`,[id]);
    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};