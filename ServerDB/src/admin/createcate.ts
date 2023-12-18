import { dbConnect } from '../mysql';

export const createCategory = async (categoryName: string): Promise<number> => {
  const client = await dbConnect();
  const [existingCategory] : any = await client.query('SELECT Category_Id FROM Category WHERE name = ?', [categoryName]);

  if (existingCategory.length > 0) {
    return existingCategory[0].Category_Id;
  }

  const [newCategory] :any= await client.query('INSERT INTO Category (name) VALUES (?)', [categoryName]);
  return newCategory.insertId;
};
