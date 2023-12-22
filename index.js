const express = require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.port || 5000

// middleware
app.use(cors());
app.use(express.json());
// msFUpzS9wC7ckQHB

const uri = "mongodb+srv://moincse022:msFUpzS9wC7ckQHB@cluster0.5xhrpbz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const TaskCollection = client.db("TaskDB").collection("task");
   
app.post('/users',async(req,res)=>{
    const task=req.body;
    console.log("new Task",task);
    const result=await TaskCollection.insertOne(task);
    res.send(result);
})
app.get('/users',async(req,res)=>{
    const cursor=TaskCollection.find()
    const result=await cursor.toArray();
    res.send(result);
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})