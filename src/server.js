import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db";
import router from "./routes/index";

const app = express();
const PORT = process.env.PORT || 4000


dotenv.config();

app.use(cors());
app.use(express.json());

//connect to MongoDB database
connectDB();

//routes
app.use("/",router);

app.get("/", (req,res) => {
    res.send("GET STARTED");
});

app.listen(PORT,()=> {
    console.log(`Server started on port ${PORT}`)
});


export default app;