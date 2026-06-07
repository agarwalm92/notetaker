import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { rateLimiter } from "./middleware/ratelimiter.js";
dotenv.config();

const app = express();
const Port = process.env.PORT || 5001;

connectDB();

//middleware
app.use(express.json());

//rate limiter
app.use(rateLimiter); 

app.use("/api/notes", noteRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/user", userRoutes);


app.listen(5001, ()=>{
    console.log("Server listening on http://localhost:5001/api/");
});  