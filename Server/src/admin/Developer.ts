import { Request, Response } from 'express';
import { client, Database } from '../server';

export const Adddev = async (req: Request, res: Response) => {
    try{
        await Database();
        const {name} = req.body
        if(!name){
            res.status(400).send({message:"Enter the name of developer"});
            return false;
        }
        const find = await client.db("Webpro").collection("dev").findOne({name});
        if(find){
            res.status(400).send({message:"Developer already exists"});
            return false;
        }
        const result = await client.db("Webpro").collection("dev").insertOne({name});
        res.status(200).send({result});
    }
    catch(e){
        console.log("Error",e);
    }
}