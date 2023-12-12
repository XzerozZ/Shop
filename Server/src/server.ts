import express from "express";
import { signup } from "./authen/signup";
import { login } from "./authen/login";
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const mongoURL = "mongodb+srv://Valhir:Dino2064!@cluster0.vts6job.mongodb.net/"
export const client = new MongoClient(mongoURL);
app.use(cors());
app.use(express.json());
export const Database = async () =>{
    try{
        await client.connect();
        console.log("Connected to MongoDB");
    } catch(error){
        console.error("ERROR connecting to MongoDB", error);
        process.exit(1);
    }
}
app.post("/api/signup", signup);
app.post("/api/login", login );

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
