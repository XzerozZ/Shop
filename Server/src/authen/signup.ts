import { Request, Response } from 'express';
import { client, Database } from '../server';
import { hashPassword } from '../hash';

export const signup = async (req: Request, res: Response) => {
    try {
        await Database();
        const {username , email , password} = req.body
        let mail = await client
        .db("Webpro")
        .collection("user")
        .findOne({ email: email });
    
      if (!mail) {
        const user = {
            username ,
            email ,
            password : await hashPassword(password)
            }
            await client.db('Webpro').collection('user').insertOne(user)
            res.status(200).send({user});
            await client.close();
        }
       console.log("already have user")
       res.status(400).send({message: "already have user"})
    } catch (error) {
        console.log(error);
    }
  };