const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.port || 5000

// middelware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@ass11.w5qxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();

        const productCollection = client.db("products").collection("product");

        // Read all data
        // http://localhost:5000/produts
        app.get('/produts', async (req, res) => {
            const quary = req.query;
            const cursor = productCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

        // Create a data
        // http://localhost:5000/productAdd
        app.post('/productAdd', async (req, res) => {

            const data = req.body;

            const result = await productCollection.insertOne(data);
            res.send(result);
            console.log('product added successfully');
        })

        // find a data
        // http://localhost:5000/product/626f7ff5a352beed38f46c8e

        app.get('/product/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await productCollection.findOne(filter);
            res.send(result);
        })

        // Update a data
        // http://localhost:5000/update/626f8730a3a7e2edde32385f

        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    ...data,
                },
            };
            const result = await productCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // Delete a data
        // http://localhost:5000/delete/626fc22fce5fae07d57b3131
        
        app.delete('/delete/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await productCollection.deleteOne(filter);
            res.send(result);
        })

        console.log("Connected successfully to server");
    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})