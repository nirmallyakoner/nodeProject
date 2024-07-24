import express from "express";
import connectDB from "./db/connectdb.js";
import web from "./routes/web.js";
import cors from 'cors'
const app = express();
app.use(cors())
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

connectDB(DATABASE_URL);

app.use(express.json());
app.use("/api", web);

app.listen(port, () => {
  console.log(`Server is running on port at  http://localhost:${port}`);
});

