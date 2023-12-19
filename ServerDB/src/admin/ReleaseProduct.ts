import { dbConnect } from '../mysql';
import { Request, Response } from 'express';
import { createDev } from './createdev';
import { createPublisher } from './createpub';
import { createCategory } from './createcate';
import { upLoadeIMG, upLoadePDF, upLoadeVideo } from '../data/supa';


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
    const { name, dev, price, description, publisher, category, facebook, instagram, X, youtube } = req.body;
    const client = await dbConnect();

    const imagedata = Promise.all(
      url?.map((item: any) => {
        if (item && item.match(/\.jpg$/) && item !== undefined && item !== null) {
          return item;
        }
      })
    );
    const pdfdata = Promise.all(
      url?.map((item: any) => {
        if (item && item.match(/.pdf$/) && item !== undefined && item !== null) {
          return item;
        }
      })
    );
    const videodata = Promise.all(
      url?.map((item: any) => {
        if (item && item.match(/.mp4$/) && item !== undefined && item !== null) {
          return item;
        } else {
          return false;
        }
      })
    );

    const pdf = await pdfdata;
    const image = await imagedata;
    const video = await videodata;
    const sanitizedImage = image.map((url: string | undefined | null) => url || '');
    const publisherId: number = await createPublisher(publisher);
    const developerId: number = await createDev(dev, facebook, instagram, X, youtube);
    const categoryId: number = await createCategory(category);
    const data = {
      name,
      price,
      image: sanitizedImage.slice(0, 5),
      video: video[0],
      description,
      release_date  : new Date(),
    };
    console.log('Sanitized Image:', sanitizedImage);
    console.log('Data:', data.video);

    // add game
    const addGame: any = await client.query(
      `INSERT INTO 
            product (name, price,release_date, image_link1 , image_link2 ,image_link3 ,image_link4 ,image_link5 , video, description, Publisher_Id) VALUES (?, ?,?, ?,?,?,?,?, ?, ?, ?)`,
      [data.name, data.price, data.release_date,data.image[0],data.image[1],data.image[2],data.image[3],data.image[4], data.video, data.description, publisherId]
    );
    const product:any = await client.query(`SELECT Product_Id FROM product WHERE name = "${data.name}"`)

    const devProductResult: any = await client.query(
      'INSERT INTO dev_product (Developer_Id, Product_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE Developer_Id=VALUES(Developer_Id), Product_Id=VALUES(Product_Id)',
      [developerId, product[0][0].Product_Id]
    );
    const productCategoryResult: any = await client.query(
      'INSERT INTO product_cate (Product_Id, Category_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE Product_Id=VALUES(Product_Id), Category_Id=VALUES(Category_Id)',
      [product[0][0].Product_Id, categoryId]
    );
    res.status(200).send('Product added successfully');
    res.send(product[0])
  } catch (error) {
    console.log(error);
  }
};

export const deletegameByID = async (req: Request, res: Response) => {
    try {
      const pool = dbConnect();
      const { id } = req.params;
      const [result] = await pool.execute("DELETE FROM product WHERE Product_Id = ?", [id]);
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