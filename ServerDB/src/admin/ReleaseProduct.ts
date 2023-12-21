import { dbConnect } from '../mysql';
import { Request, Response } from 'express';
import { createDev } from './createdev';
import { createPublisher } from './createpub';
import { createCategory } from './createcate';
import { upLoadeIMG, upLoadeVideo } from '../data/supa';

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

    const { name, dev, price, description, publisher, category, facebook, instagram, X, youtube } = req.body;
    const client = await dbConnect();

    const publisherId: number = await createPublisher(publisher);
    const developerId: number = await createDev(dev, facebook, instagram, X, youtube);
    const categoryId: number = await createCategory(category);
    const data = {
      name,
      price,
      image: url.slice(0, 5),
      video: url[5],
      description,
      release_date: new Date(),
    };
    const addGame: any = await client.query(
      `INSERT INTO 
            product (name, price,release_date,video,description, Publisher_Id) VALUES (?, ?,?,?, ?, ?)`,
      [data.name, data.price, data.release_date, data.video, data.description, publisherId]
    );
    const product: any = await client.query(`SELECT Product_Id FROM product WHERE name = "${data.name}"`);
    
    await client.query(
      'INSERT INTO Imageset(image1, image2, image3, image4, image5 , Product_Id) values (?, ?,?,?,?,?)',
      [data.image[0], data.image[1], data.image[2], data.image[3], data.image[4], product[0][0].Product_Id]
    );
    
    await client.query(
      'INSERT INTO dev_product (Developer_Id, Product_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE Developer_Id=VALUES(Developer_Id), Product_Id=VALUES(Product_Id)',
      [developerId, product[0][0].Product_Id]
    );
    await client.query(
      'INSERT INTO product_cate (Product_Id, Category_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE Product_Id=VALUES(Product_Id), Category_Id=VALUES(Category_Id)',
      [product[0][0].Product_Id, categoryId]
    );

    res.status(200).send({
      message: 'Product added successfully',
      product: product[0]
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
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
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
