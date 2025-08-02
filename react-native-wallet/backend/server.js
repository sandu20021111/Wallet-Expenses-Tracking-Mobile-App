import express from "express";
import dotenv, { parse } from "dotenv";
import { initDB } from "./src/config/db.js";
import ratelimiter from "./src/config/upstash.js";
import transactionsRoute from "./src/routes/transactionsRoute.js";

dotenv.config();

const app = express();

//middleware
app.use(ratelimiter);
app.use(express.json());

//custom simple middleware
//app.use((req, res, next) => {
//console.log("Hey we hit a req, the method is", req.method);
//next();
//});

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
