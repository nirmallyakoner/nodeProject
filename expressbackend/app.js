import express from "express";
import connectDB from "./db/connectdb.js";
import web from "./routes/web.js";
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from "./routes/userRoutes.js";
const app = express();
dotenv.config()
app.use(cors())
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL ;

connectDB(DATABASE_URL);

app.use(express.json());
app.use("/api/user", userRoutes);  
app.use("/api", web);

app.listen(port, () => {
  console.log(`Server is running on port at  http://localhost:${port}`);
});

