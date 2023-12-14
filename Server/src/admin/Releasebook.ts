import { Request, Response } from "express";
import { upLoadeIMG, upLoadePDF , upLoadeVideo } from "../data/supa";
import { client , Database} from "../server";
import { ObjectId } from "mongodb";

export const postbook = async (req: Request, res: Response) => {
  try {
    const dataFile = req.files;

        const url = await Promise.all(
        (dataFile as any[]).map(async (file: any) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          const url = await upLoadeIMG(file.buffer);
          return url;
        } else if (file.mimetype === "application/pdf") {
          const url = await upLoadePDF(file.buffer);
          return url;
        } else if (file.mimetype === "video/mp4") {
          const url = await upLoadeVideo(file.buffer);
          return url;
        }
      })
    );

    const { title, dev, price, description , publisher ,category  } = req.body;
    await client.connect();
    
    const data = {
      title,
      developer : new ObjectId(dev),
      publisher : new ObjectId(publisher) ,
      category : new ObjectId(category),
      price,
      description,
      image : url.slice(0,4),
      video : url[5],
      date : new Date()
    };
    await client.db("Webpro").collection("product").insertOne(data);
    await client.close();
    res.status(200).send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookByID = async (req: Request, res: Response) => {
    try {
        await Database();
        const {id} = req.params;
        const result = await client.db("Webpro").collection("product").deleteOne({ _id: new ObjectId(id) });
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};