import { Request, Response } from "express";
import { dbConnect } from "../mysql";
import { hashPassword } from "../hash";
export const signup = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();
    const { username, email, password } = req.body;
    
    const findemail : any  = await client.query("SELECT * FROM user WHERE email = ?", [email]);
  
    if (findemail[0] != 0) {
      return res.status(400).send({
        message: "Email already in use"
      });
    }
    const hash = await hashPassword(password)
    // Insert new user
    await client.query(
      `INSERT INTO User(username, email, password) VALUES (?, ?, ?)`,
      [username, email, hash]
    );

    return res.status(201).send({
      message: "Sign up successful",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
