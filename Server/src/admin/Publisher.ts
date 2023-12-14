import { Request, Response } from 'express';
import { client, Database } from '../server';


export const AddPublisher = async (req:Request,res:Response) => {
    try {
        const {name} = req.body;
        await Database();
        if(!name){
            res.status(400).send({message:"Enter the name of publisher"});
            return false;
        }
        const find = await client.db("Webpro").collection("publisher").findOne({name});
        if(find){
            res.status(400).send({message:"Publisher already exists"});
            return false;
        }
        const result = await client.db("Webpro").collection("publisher").insertOne({name});
        res.status(200).send({result});
    } catch (error) {
        console.log("Error",error);
    }
};