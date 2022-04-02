require('dotenv').config();
const express = require("express");
const app = express();
const homeRoutes = require("./routes/home.js")
const aboutRoutes = require("./routes/about.js")
const projectRoutes = require("./routes/projects.js")
const userRoutes = require("./routes/user.js")
const mongoose = require('mongoose');

//connect MongoDB
mongoose.connect("mongodb://mufaro:mewmewnyaa11@portofolio-shard-00-00.txfzk.mongodb.net:27017,portofolio-shard-00-01.txfzk.mongodb.net:27017,portofolio-shard-00-02.txfzk.mongodb.net:27017/porto123?ssl=true&replicaSet=atlas-6836hm-shard-0&authSource=admin&retryWrites=true&w=majority").then(() => {
    console.log('conn MongoDB');
}).catch((error) => {
    console.log(error);
});

app.use(express.json())
const cors = require("cors");
app.use(cors({origin: true, credentials: true}));

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`)
});

//Routes
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

