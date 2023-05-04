const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./userSchema");


const app = express();
app.use(express.json());
app.use(cors());

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


