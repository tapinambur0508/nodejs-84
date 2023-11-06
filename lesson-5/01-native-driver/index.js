const { MongoClient } = require("mongodb");

const DB_URI = `mongodb+srv://student:7eD3md55bkof5UiD@my-first-cluster.mx9d1xd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(DB_URI);

async function run() {
  try {
    await client.connect();

    const db = client.db("sample_airbnb");
    const collections = await db.listCollections().toArray();

    console.log(collections.map(({ name }) => name));
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
