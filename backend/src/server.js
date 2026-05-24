import express from "express";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use("/api/notes", noteRoutes);

app.listen(5001, ()=>{
    console.log("Server listening on http://localhost:5001/api/");
}); 