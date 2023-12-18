"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("./authen/signup");
const login_1 = require("./authen/login");
//import { AddtoCart , DeleteCart, DeleteItemCheckOut } from "./Product/Cart";
const ReleaseProduct_1 = require("./admin/ReleaseProduct");
//import { UpdateGame } from "./admin/UpdateProduct";
//import { checkToken } from "./authen/tokenchecker";
//import { Fetchgame , FetchCategories } from "./Product/Fetchgame";
//import {auth} from "./authen/decode";
//import { showtrans } from "./data/showtransaction";
//import { getproductinCart } from "./Product/SPIC";
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//import { Checkout } from "./data/checkout";
//import { getGameByID } from "./Product/ShowgamebyID";
const app = (0, express_1.default)();
const cors = require("cors");
const multer = require("multer");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
exports.secret = "AV1234";
const multerStore = multer({
    storage: multer.memoryStorage(),
});
app.use(multerStore.array("file"));
//app.get("/api/checktoken", checkToken);
app.post("/api/signup", signup_1.signup);
app.post("/api/login", login_1.login);
app.post("/api/postgame", ReleaseProduct_1.postgame);
//app.post("/api/addtocart",auth, AddtoCart);
app.delete("/api/delete/:id", ReleaseProduct_1.deletegameByID);
app.put("/api/changepassword", login_1.changePassword);
//app.put("/api/updategame/:id", UpdateGame);
//app.get("/api/fetchgame", Fetchgame);
//app.get("/api/fetchcategory", FetchCategories);
//app.get("/api/showproduct", getproductinCart);
//app.delete("/api/deletecart",auth, DeleteCart);
//app.delete("/api/deletecheckout", DeleteItemCheckOut);
//app.post("/api/checkout", Checkout);
//app.get("/api/showtrans", showtrans);
//app.get("/api/getgame", getGameByID);
const PORT = parseInt((process.env.PORT || '4000'), 10);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
