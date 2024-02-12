import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connectDbMiddleware.js";
import router from "./src/db/routes/userRoutes.js"
const app = express();
const PORT = 3001;

app.use(express.json());

// MONGO CONNECTION
const conf = dotenv.config();
const connectionString = process.env.MONGO_TOKEN;
connectDB(connectionString);

app.use(router);

app.listen(PORT);

console.log(
  `\n--------------------
      \nStarteed at port: ${PORT}
      \nHere is your link: http://localhost:${PORT}/
      \n--------------------`
);
