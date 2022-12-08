const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

require('dotenv').config()
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uuaa4ib.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.get('/', (req, res) =>{
    res.send('Running my node CRUD server')
})

async function run() {
    try {
      await client.connect();
      console.log("mongodb connected");
    const productsCollection = client.db("revvings").collection("products")
    const productCollection = client.db("revvings").collection("product")
    
    // get all products
    app.get('/products', async (req, res) =>{
      const query ={}
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
      })
      //get products details
    app.get('/product/:id' , async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const product= await productsCollection.findOne(query);
      res.send(product);
    })  
    //post product
    app.post('/product', async (req, res) =>{
      const newProduct = req.body;
      const result= await productCollection.insertOne(newProduct);
      res.send(result);
   }) 
       // get all products
       app.get('/all-products', async (req, res) =>{
        const query ={}
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
        })
  //delete
  app.delete('/product/:id', async (req, res) =>{
    const id = req.params.id;
    const query = {_id : ObjectID(id)}
    const result = await productCollection.deleteOne(query);
    res.send(result);
})
    } finally {
      
    }
  }
  run().catch(console.dir);



app.listen(port, () => {
    console.log('crud server is running ');
})