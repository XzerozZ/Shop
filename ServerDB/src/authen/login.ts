import { Request, Response } from "express";
import { dbConnect } from "../mysql";
import { hashPassword, matchPassword } from "../hash";
import jwt from "jsonwebtoken";
import { secret } from "../server";

export const login = async (req: Request, res: Response) => {
    try {
        const client = await dbConnect();
        const { email, password } = req.body;
        const data: any = await client.query('SELECT * FROM user WHERE email = ?', [email]);

        if (data.length === 0 && !(await matchPassword(password, data[0].password))) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        console.log(data);
        const payload = { id: data[0]._id };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login success', result: data[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const client = await dbConnect();
        const { email, newPassword } = req.body;
        const data: any = await client.query('SELECT * FROM user WHERE email = ?', [email]);

        if (data[0].length === 0 || newPassword === data[0].password) { 
            res.status(400).send("Error. Please try again!");
            return;
        }

        const hash = await hashPassword(newPassword);
        await client.query('UPDATE user SET password = ? WHERE email = ?', [hash, email]);

        res.status(200).send("Change password succeeded");
    } catch (error) {
        console.error("Error during password change", error);
        res.status(500).send("Internal Server Error");
    }
};
