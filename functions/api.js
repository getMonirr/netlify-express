const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const allChefs = require('../chefs.json');

//Get all students


router.get("/chefs", (req, res) => {
  res.send(allChefs)
})

//showing demo records
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com',
    },
  ]);
});




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i5ku26o.mongodb.net/?retryWrites=true&w=majority`;

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

    const dataBase = client.db("netDB").collection('nets');

    router.get('/net', async (req, res) => {
      const result = await dataBase.find().toArray()
      res.send(result)
    })

    router.get('/', (req, res) => {
      res.send('App is running..');
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.use('/.netlify/functions/api', router);
app.listen('3000', () => {
  console.log("app my running");
})
module.exports.handler = serverless(app);

// const express = require('express');
// const serverless = require('serverless-http');
// const app = express();
// const router = express.Router();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config()

// const allChefs = require('../chefs.json');

// // Get all chefs
// router.get("/chefs", (req, res) => {
//   res.send(allChefs)
// })

// // Showing demo records
// router.get('/demo', (req, res) => {
//   res.json([
//     {
//       id: '001',
//       name: 'Smith',
//       email: 'smith@gmail.com',
//     },
//     {
//       id: '002',
//       name: 'Sam',
//       email: 'sam@gmail.com',
//     },
//     {
//       id: '003',
//       name: 'lily',
//       email: 'lily@gmail.com',
//     },
//   ]);
// });

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i5ku26o.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     const dataBase = client.db("netDB").collection('nets');

//     router.get('/net', async (req, res) => {
//       const result = await dataBase.find().toArray()
//       res.send(result)
//     })

//     router.get('/', (req, res) => {
//       res.send('App is running..');
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//   } catch (error) {
//     console.error(error);
//   } finally {
//     // Ensure that the client will close when you finish/error
//     // await client.close();
//   }
// }

// run().catch(console.dir);

// app.use('/.netlify/functions/api', router);

// module.exports.handler = serverless(app);
