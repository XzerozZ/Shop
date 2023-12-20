import { dbConnect } from "../mysql";
import { Request, Response } from "express";
import { createDev } from "./createdev";
import { createPublisher } from "./createpub";
import { createCategory } from "./createcate";
import { upLoadeIMG, upLoadeVideo } from "../data/supa";

export const postgame = async (req: Request, res: Response) => {
  try {
    const dataFile = req.files;

    const url = await Promise.all(
      (dataFile as any[]).map(async (file: any) => { 
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          return await upLoadeIMG(file.buffer);
        }
        else if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv")  {
          return await upLoadeVideo(file.buffer);
        }
      })
    );



    res.status(200).send(url);
  } catch (error) {
    console.log(error);
  }
};

export const deletegameByID = async (req: Request, res: Response) => {
  try {
    const pool = dbConnect();
    const { id } = req.params;
    const [result] = await pool.execute(
      "DELETE FROM product WHERE Product_Id = ?",
      [id]
    );
    pool.end();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
