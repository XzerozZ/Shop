import { Request, Response } from 'express';
import { client, Database,secret } from '../server';
import jwt from "jsonwebtoken";
import { matchPassword,hashPassword } from '../hash';


export const login = async (req: Request, res: Response) => {
    try {
        await Database();
        const {email , password} = req.body
        const findEmail = await client.db('Webpro').collection('user').findOne({ email: email });
        if (!findEmail) {
            res.status(400).json({ message: 'email not found' });
            return false;
        }
        const MatchPassword = await matchPassword(password, findEmail.password);
        if (!MatchPassword) {
            res.status(400).json({ message: 'password not match' });
            return false;
        }
        const payload = { id: findEmail._id ,username: findEmail.username};
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'login success', result: findEmail});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
    Database();
    const { email, newPassword } = req.body;
    const findEmail = await client.db('Webpro').collection('user').findOne({ email: email });
    if (!findEmail) {
      res.send("No User found");
      return false;
    }
    const MatchPassword = await matchPassword(newPassword, findEmail.password);
    if (MatchPassword) {
      res.send("Password is the same");
      return false;
    }
    const hash = await hashPassword(newPassword);
    await client.db('Webpro').collection('user').updateOne({ email }, { $set: { password: hash } });
    res.status(200).send("Change Password Success");
    } catch (error) {
      console.error("Error during password change", error);
      res.status(500).send("Internal Server Error");
    }
  };