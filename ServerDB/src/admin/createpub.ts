import { dbConnect } from '../mysql';

export const createPublisher = async (publisherName: string): Promise<number> => {
  const client = await dbConnect();
  const [existingPublisher] : any = await client.query('SELECT Publisher_Id FROM Publisher WHERE name = ?', [publisherName]);

  if (existingPublisher.length > 0) {
    return existingPublisher[0].Publisher_Id;
  }

  const [newPublisher] : any = await client.query('INSERT INTO Publisher (name) VALUES (?)', [publisherName]);
  return newPublisher.insertId;
};
