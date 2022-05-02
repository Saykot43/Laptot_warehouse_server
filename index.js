const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.port || 5000

app.use(cors())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@ass11.w5qxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    
    await client.connect();

    const productCollection = client.db("products").collection("product");

    // Read all data

    app.get('/produts', async(req, res)=>{
        const quary = req.query;
        const cursor = productCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
    })

    // Create a data

    // Update a data

    // Delete a data


    // const result = await productCollection.insertOne();
    console.log("Connected successfully to server");
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})