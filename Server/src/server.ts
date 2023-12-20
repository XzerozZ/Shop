import express from "express";
import { signup } from "./authen/signup";
import { login,changePassword,logout} from "./authen/login";
import { AddtoCart , DeleteCart, DeleteItemCheckOut } from "./Product/Cart";
import { postgame,deletegameByID} from "./admin/ReleaseProduct";
import { UpdateGame } from "./admin/UpdateProduct";
import { checkToken } from "./authen/tokenchecker";
import { Fetchgame , FetchCategories } from "./Product/Fetchgame";
import {auth} from "./authen/decode";
import { showtrans } from "./data/showtransaction";
import { getproductinCart } from "./Product/SPIC";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { Checkout } from "./data/checkout";
import { getGameByID } from "./Product/ShowgamebyID";
import { getUserbyID } from "./data/UserbyId";
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const mongoURL = "mongodb+srv://Valhir:Dino2064!@cluster0.vts6job.mongodb.net/"
export const client = new MongoClient(mongoURL);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyparser.json());
app.use(cookieParser());
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
export const secret = "AV1234";
const multerStore = multer({
    storage: multer.memoryStorage(),
  });
  
app.use(multerStore.array("file"));
app.get("/api/checktoken", checkToken);
app.post("/api/signup", signup);
app.post("/api/login", login );
app.post("/api/postgame", postgame);
app.post("/api/addtocart", AddtoCart);
app.delete("/api/delete/:id", deletegameByID);
app.put("/api/changepassword", changePassword);
app.put("/api/updategame/:id", UpdateGame);
app.get("/api/fetchgame", Fetchgame);
app.get("/api/fetchcategory", FetchCategories);
app.get("/api/showproduct", getproductinCart);
app.delete("/api/deletecart",auth, DeleteCart);
app.delete("/api/deletecheckout", DeleteItemCheckOut);
app.post("/api/checkout", Checkout);
app.get("/api/showtrans/:userID", showtrans);
app.get("/api/getgame", getGameByID);
app.get("/api/getuser", getUserbyID);
app.get("/api/logout", logout);
const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
