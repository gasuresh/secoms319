const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./prodSchema");
const User = require("./userSchema");
const Order = require("./orderSchema")


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
  const query = { _id: id };co
  const oneProduct = await Product.findOne(query);

  oneProduct.image = oneProduct.image.split('/').pop().split('.').slice(0, -1).join('.');

  resp.send(oneProduct);
});


const getNextProductId = async () => {
  const product = await Product.findOne().sort({ _id: -1 }).limit(1);
  return product ? product._id + 1 : 1;
};


app.post("/product/insert", async (req, res) => {
  console.log(req.body);
  const p_id = await getNextProductId();
  const ptitle = req.body.title;
  const pprice = req.body.price;
  const pdescription = req.body.description;
  const pcategory = req.body.category;
  const pimage = req.body.image;
  const pquantity = req.body.quantity;

  const formData = new Product({
    _id: p_id,
    title: ptitle,
    price: pprice,
    description: pdescription,
    category: pcategory,
    image: pimage,
    quantity: pquantity,
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


app.put("/product/update/:id", async (req, res) => {
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


app.delete("/product/delete", async (req, res) => {
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

app.get("/images", (req, res) => {
  const fs = require("fs");
  const path = "./images";
  fs.readdir(path, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading directory");
    } else {
      const imageNames = files.filter((file) => file.endsWith(".jpg")).map((file) => file.replace(/\.jpg$/, ""));
      res.send(imageNames);
    }
  });
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


app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body); // assuming you have a model called "Order"
    console.log(order);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

  

