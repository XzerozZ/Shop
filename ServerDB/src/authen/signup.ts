import { Request, Response } from "express";
import { dbConnect } from "../mysql";

export const signup = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();
    const { username, email, password } = req.body;

    // Check if the email already exists using COUNT
    const emailCountResult: any = await client.query(
      `SELECT COUNT(*) as count FROM user WHERE email = ?`,
      [email]
    );

    // Extract the count value from the result
    const emailCount = emailCountResult[0]?.count;

    // Check if the email count is greater than 0
    if (emailCount > 0) {
      return res.status(400).send({
        message: "Email already in use",
      });
    }

    // Insert new user
    await client.query(
      `INSERT INTO User(username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );

    return res.status(201).send({
      message: "Sign up successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
