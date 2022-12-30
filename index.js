const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
// Database configuration

const uri =
  "mongodb+srv://taniadb:oWKaLmYtQqtEhZYa@cluster0.hyahdcy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Collection

const postsCollection = client.db("socialab").collection("posts");

app.post("/store/post", async (req, res) => {
  const post = req.body;
  const result = await postsCollection.insertOne(post);
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  const query = {};
  const posts = await postsCollection.find(query).toArray();
  res.send(posts);
});
app.listen(port, () => {
  console.log(`SocaBook app listening on port ${port}`);
});
