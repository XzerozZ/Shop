import { Request, Response } from 'express';
import { dbConnect } from '../mysql'; // Assuming you have a database connection pool

export const Fetchgame = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();
    const query = `
    SELECT
    product.*,
    developer.name AS developer_info,
    developer.facebook as facebook,
    developer.instagram as instagram,
    developer.X as X,
    developer.youtube as youtube,
    developer.name AS publisher_info,
    category.name AS category
  FROM
    product
    LEFT JOIN dev_product ON product.Product_Id = dev_product.Product_Id
    LEFT JOIN developer ON dev_product.Developer_Id = developer.Developer_Id
    LEFT JOIN publisher ON product.Publisher_Id = publisher.Publisher_Id
    LEFT JOIN product_cate ON product.Product_Id = product_cate.Product_Id
    LEFT JOIN category ON product_cate.Category_Id = category.Category_Id;
    `;

    const result : any = await client.query(query);

    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const FetchCategories = async (req : Request , res : Response) => {
    try {
      const client = await dbConnect();
      const query = `
      SELECT
      category.*
      FROM
      category;
      `;
      const result : any = await client.query(query);

      res.status(200).send(result[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };