const express = require("express");
const app = express();
const homeRoutes = require("./routes/home.js")
const aboutRoutes = require("./routes/about.js")
const projectRoutes = require("./routes/projects.js")
const userRoutes = require("./routes/user.js")
const ppRoutes = require("./routes/pp.js")
const mongoose = require('mongoose');
require('dotenv').config();

//connect MongoDB
mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log('conn MongoDB');
}).catch((error) => {
    console.log(error);
});

// dotenv.config();
app.use(express.json())
const cors = require("cors");
// app.use(cors());
// app.use(cors({ credentials: true }))
app.use(cors({origin: true, credentials: true}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`)
});

//Routes
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/pp", ppRoutes);
app.use("/api/user", userRoutes);

