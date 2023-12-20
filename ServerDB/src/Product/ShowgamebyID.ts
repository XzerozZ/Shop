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
 
    const query = `
    SELECT
      product.*,
      developer.name AS developer_info,
      developer.facebook as facebook,
      developer.instagram as instagram,
      developer.X as X,
      developer.youtube as youtube,
      publisher.name AS publisher_info,
      category.name AS category,
      imageset.image1 AS img1,
      imageset.image2 AS img2,
      imageset.image3 AS img3,
      imageset.image4 AS img4,
      imageset.image5 AS img5
    FROM
      product
      LEFT JOIN dev_product ON product.Product_Id = dev_product.Product_Id
      LEFT JOIN developer ON dev_product.Developer_Id = developer.Developer_Id
      LEFT JOIN publisher ON product.Publisher_Id = publisher.Publisher_Id
      LEFT JOIN product_cate ON product.Product_Id = product_cate.Product_Id
      LEFT JOIN category ON product_cate.Category_Id = category.Category_Id
      LEFT JOIN imageset on imageset.Product_Id = Product.Product_Id;`;

  const result: any = await client.query(query);

  // Map SQL result to NoSQL-like structure
  const mappedResult = result[0].map((item: any) => ({
    _id: item.Product_Id,
    name: item.name,
    price: item.price,
    video : item.video,
    image: [
      item.img1,
      item.img2,
      item.img3,
      item.img4,
      item.img5,
    ],
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