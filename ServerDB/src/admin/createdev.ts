import { dbConnect } from '../mysql';

export const createDev = async (devName: string, facebook: string, instagram: string, X: string, youtube: string): Promise<number> => {
  const client = await dbConnect();
  const [existingDev] : any= await client.query('SELECT Developer_Id FROM Developer WHERE name = ?', [devName]);

  if (existingDev.length > 0) {
    return existingDev[0].Developer_Id;
  }

  const [newDev]: any = await client.query('INSERT INTO Developer (name, facebook, instagram, X, youtube) VALUES (?, ?, ?, ?, ?)', [devName, facebook, instagram, X, youtube]);
  return newDev.insertId;
};
