import express from "express";
import dotenv from "dotenv";

import connectDB from "db/connectDbMiddleware.js";
import userRouter from "routes/userRoutes.js";
import notesRouter from "routes/notesRoutes.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// MONGO CONNECTION
const conf = dotenv.config();
const connectionString = process.env.MONGO_TOKEN;
connectDB(connectionString);

app.use(userRouter);
app.use(notesRouter);

app.listen(PORT);

console.log(
  `\n--------------------
      \nStarteed at port: ${PORT}
      \nHere is your link: http://localhost:${PORT}/
      \n--------------------`
);
