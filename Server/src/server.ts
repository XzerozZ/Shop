import express from "express";
import { signup } from "./authen/signup";
import { login,changePassword } from "./authen/login";
import { Adddev } from "./admin/Developer";
import { AddPublisher } from "./admin/Publisher";
import { AddtoCart } from "./Product/Cart";
import { postgame,deletegameByID,UpdateGame} from "./admin/Releasebook";
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
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
const multerStore = multer({
    storage: multer.memoryStorage(),
  });
  
app.use(multerStore.array("file"));
app.post("/api/signup", signup);
app.post("/api/login", login );
app.post("/api/dev", Adddev);
app.post("/api/publisher", AddPublisher);
app.post("/api/postgame", postgame);
app.post("/api/addtocart", AddtoCart);
app.delete("/api/delete/:id", deletegameByID);
app.put("/api/changepassword", changePassword);
app.put("/api/updategame/:id", UpdateGame);

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
