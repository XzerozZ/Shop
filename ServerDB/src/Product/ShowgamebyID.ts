import { Request, Response } from 'express';
import { dbConnect } from '../mysql'; // Assuming you have a database connection pool

export const getGameByID = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();
    const { id } = req.query;
    if (!id) {
      res.status(400).send("Bad Request: Missing 'id' parameter");
      return;
    }
 
    const result : any = await client.query(`
    SELECT distinct
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
    LEFT JOIN category ON product_cate.Category_Id = category.Category_Id
    Where product.Product_Id = ?;`,[id]);
    const mappedResult = result[0].map((item: any) => ({
      _id: item.Product_Id,
      name: item.name,
      price: item.price,
      release_date: item.release_date,
      description: item.description,
      developer_info: {
        name: item.developer_info,
        facebook: item.facebook,
        instagram: item.instagram,
        X: item.X,
        youtube: item.youtube,
      },
      publisherInfo: {
        _id: item.Publisher_Id,
        name: item.publisher_info,
      },
      categoryDetails: {
        name: item.category,
      },
    }));
    res.status(200).send(mappedResult);
    const firstImageURL = result[0][0].image[1];
    console.log(firstImageURL);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};