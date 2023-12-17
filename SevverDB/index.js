const express = require("express");
const { signup } = require("./authen/signup");
const { login, changePassword } = require("./authen/login");
const { AddtoCart, DeleteCart, DeleteItemCheckOut } = require("./Product/Cart");
const { postgame, deletegameByID, UpdateGame } = require("./admin/ReleaseProduct");
const { checkToken } = require("./authen/tokenchecker");
const { Fetchgame, FetchCategories } = require("./Product/Fetchgame");
const { auth } = require("./authen/decode");
const { showtrans } = require("./data/showtransaction");
const { getproductinCart } = require("./Product/SPIC");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Checkout } = require("./data/checkout");
const { getGameByID } = require("./Product/ShowgamebyID");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const mongoURL = "mongodb+srv://Valhir:Dino2064!@cluster0.vts6job.mongodb.net/";
const app = express();
const multerStore = multer({
  storage: multer.memoryStorage(),
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.json());
const client = new MongoClient(mongoURL);

const Database = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("ERROR connecting to MongoDB", error);
    process.exit(1);
  }
};

const secret = "AV1234";

app.use(multerStore.array("file"));
app.get("/api/checktoken", checkToken);
app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/postgame", postgame);
app.post("/api/addtocart", auth, AddtoCart);
app.delete("/api/delete/:id", deletegameByID);
app.put("/api/changepassword", changePassword);
app.put("/api/updategame/:id", UpdateGame);
app.get("/api/fetchgame", Fetchgame);
app.get("/api/fetchcategory", FetchCategories);
app.get("/api/showproduct", getproductinCart);
app.delete("/api/deletecart", auth, DeleteCart);
app.delete("/api/deletecheckout", DeleteItemCheckOut);
app.post("/api/checkout", Checkout);
app.get("/api/showtrans", showtrans);
app.get("/api/getgame", getGameByID);

const PORT = parseInt(process.env.PORT || "4000", 10);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});