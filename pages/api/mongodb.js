import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://sasha:Winx4210@clusterfotogram.3phxrwf.mongodb.net/';

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient, db: cachedClient.db() };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;

  return { client, db: client.db() };
}
