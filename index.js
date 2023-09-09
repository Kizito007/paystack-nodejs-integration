// imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
// const ngrok = require("@ngrok/ngrok");

const app = express();
dotenv.config();

// specify the port from our enviroment variable
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
// connect database
connectDB();

// routes
const { userRoute } = require("./routes/userRoutes.js");
app.use("/users", userRoute);


app.get('/', async (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});

// if (process.env.NODE_ENV == "development") {
//   (async function () {
//     const url = await ngrok.connect({ addr: 3030, authtoken_from_env: true, authtoken: process.env.NGROK_AUTHTOKEN });
//     console.log(`Ingress established at: ${url}`);
//   })();
// }