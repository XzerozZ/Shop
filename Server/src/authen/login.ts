import { Request, Response } from 'express';
import { client, Database } from '../server';
import { matchPassword } from '../hash';

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
        res.status(200).json({ message: 'login success', result: findEmail});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
};