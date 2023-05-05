const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./prodSchema");
const User = require("./userSchema");


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"))
app.use("/images", express.static("images"))

mongoose.connect("mongodb://127.0.0.1:27017/storecatalog",
  {
    dbName: "storecatalog",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const port = process.env.PORT || 4000;
const host = "localhost";

app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/product", async (req, resp) => {
  const query = {};
  const allProducts = await Product.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});

app.get("/product/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneProduct = await Product.findOne(query);
  console.log(oneProduct);
  resp.send(oneProduct);
});


app.post("/insert", async (req, res) => {
  console.log(req.body);
  const p_id = req.body._id;
  const ptitle = req.body.title;
  const pprice = req.body.price;
  const pdescription = req.body.description;
  const pcategory = req.body.category;
  const pimage = req.body.image;
  const prate = req.body.rating.rate;
  const pcount = req.body.rating.count;

  const formData = new Product({
    _id: p_id,
    title: ptitle,
    price: pprice,
    description: pdescription,
    category: pcategory,
    image: pimage,
    rating: { rate: prate, count: pcount },
  });

  try {
    // await formData.save();
    await Product.create(formData);
    const messageResponse = { message: `Product ${p_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new product:" + err);
  }

});


app.put("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const update = req.body;

    const query = { _id: productId };

    const result = await Product.findByIdAndUpdate(query, update);

    if (!result) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.send({ message: "Product updated successfully" });
    }
  } catch (err) {
    console.log("Error while updating product: " + err);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Product.deleteOne(query);
    const messageResponse = {
      message: `Product ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + p_id + " " + err);
  }
});

app.get("/findUser", async (req, res) => {
  const { email, password } = req.query;
  const query = { email, password };
  const user = await User.findOne(query);

  res.send(user);

});

app.post("/registerUser", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      email: email,
      password: password,
      username: username
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});




