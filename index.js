const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@ass11.w5qxo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();

        const productCollection = client.db("products").collection("product");
        const itemCollection = client.db("products").collection("item");

        // user login 
        app.post('/login', async(req, res)=>{
            const email= req.body;
            console.log(email);
            // const result = await productCollection.insertOne(data);
            // res.send(email);
        })

        // Read all data
        app.get('/produts', async (req, res) => {
            const quary = req.query;
            const cursor = productCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

        // Create a data
        app.post('/productAdd', async (req, res) => {

            const data = req.body;

            const result = await productCollection.insertOne(data);
            res.send(result);
            console.log('product added successfully');
        })

        // item collections added

        app.get('/item', async(req, res) => {
            const email = req.query.email;
            const query = {email};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
          })
    
          app.post('/item', async(req, res) => {
            const item = req.body;
            const result = await itemCollection.insertOne(item);
            res.send(result);
          })

        // find a data

        app.get('/product/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await productCollection.findOne(filter);
            res.send(result);
        })

        // Update a data

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