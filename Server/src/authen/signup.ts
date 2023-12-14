import { Request, Response } from 'express';
import { client, Database } from '../server';
import { hashPassword } from '../hash';

export const signup = async (req: Request, res: Response) => {
    try {
        await Database();
        const {username , email , password} = req.body
        const data = {
            username ,
            email ,
            password : await hashPassword(password)
        }
        await client.db('Webpro').collection('user').insertOne(data)
        res.status(200).send({data});
        await client.close();
    } catch (error) {
        console.log(error);
    }
  };