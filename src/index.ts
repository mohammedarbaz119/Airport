import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import * as dotenv from "dotenv";
import cors from "cors"
import express from "express";
import router from "./routes.js";
dotenv.config();

const app = express();
app.use(cors())
app.use("/", router);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running at port 3000");
    });
  })
  .catch((error) => console.log(error));
