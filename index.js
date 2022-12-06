const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

require('dotenv').config()
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uuaa4ib.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.get('/', (req, res) =>{
    res.send('Running my node CRUD server')
})

async function run() {
    try {
      await client.connect();
      console.log("mongodb connected");
 
    } finally {
      
    }
  }
  run().catch(console.dir);



app.listen(port, () => {
    console.log('crud server is running ');
})