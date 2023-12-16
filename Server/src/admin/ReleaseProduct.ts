import { Request, Response } from "express";
import { upLoadeIMG, upLoadePDF , upLoadeVideo } from "../data/supa";
import { client , Database} from "../server";
import { ObjectId } from "mongodb";

export const postgame = async (req: Request, res: Response) => {
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

    const { name, dev, price, description , publisher ,category  } = req.body;
    await client.connect();
    let developer = await client
    .db("Webpro")
    .collection("dev")
    .findOne({ name: dev });

  let developerId;

  if (!developer) {
    // If developer doesn't exist, insert a new record
    const devResult = await client
      .db("Webpro")
      .collection("dev")
      .insertOne({ name: dev });

    developerId = devResult.insertedId;
  } else {
    developerId = developer._id;
  }

  // Check if publisher exists
  let pub = await client
    .db("Webpro")
    .collection("publisher")
    .findOne({ name: publisher });

  let publisherId;

  if (!pub) {
    // If publisher doesn't exist, insert a new record
    const pubResult = await client
      .db("Webpro")
      .collection("publisher")
      .insertOne({ name: publisher });

    publisherId = pubResult.insertedId;
  } else {
    publisherId = pub._id;
  }

  // Check if category exists
  let cat = await client
    .db("Webpro")
    .collection("categories")
    .findOne({ name: category });

  let categoryId;

  if (!cat) {
    // If category doesn't exist, insert a new record
    const catResult = await client
      .db("Webpro")
      .collection("categories")
      .insertOne({ name: category });

    categoryId = catResult.insertedId;
  } else {
    categoryId = cat._id;
  }
    const data = {
      name,
      developer: developerId,
      publisher: publisherId,
      category: categoryId,
      price : Number(price) ,
      description,
      image : url.slice(0,5),
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
// Delete books
export const deletegameByID = async (req: Request, res: Response) => {
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

// Update books

export const UpdateGame = async (req:Request,res:Response)=>{
  try {
      const {id} = req.params;
      const {price} = req.body;
      await Database();
      const updategame = {
          price
      };
      const change = await client.db("Webpro").collection("product").updateOne({_id: new ObjectId(id)},{$set:updategame});
      console.log(change);
      res.status(201).json(change);
  } catch (error) {
      console.log("Error",error);
      
  }
};