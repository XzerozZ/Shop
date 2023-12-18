"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.Database = exports.client = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("./authen/signup");
const login_1 = require("./authen/login");
const Cart_1 = require("./Product/Cart");
const ReleaseProduct_1 = require("./admin/ReleaseProduct");
const UpdateProduct_1 = require("./admin/UpdateProduct");
const tokenchecker_1 = require("./authen/tokenchecker");
const Fetchgame_1 = require("./Product/Fetchgame");
const decode_1 = require("./authen/decode");
const showtransaction_1 = require("./data/showtransaction");
const SPIC_1 = require("./Product/SPIC");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const checkout_1 = require("./data/checkout");
const ShowgamebyID_1 = require("./Product/ShowgamebyID");
const UserbyId_1 = require("./data/UserbyId");
const app = (0, express_1.default)();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const mongoURL = "mongodb+srv://Valhir:Dino2064!@cluster0.vts6job.mongodb.net/";
exports.client = new MongoClient(mongoURL);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const Database = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("ERROR connecting to MongoDB", error);
        process.exit(1);
    }
});
exports.Database = Database;
exports.secret = "AV1234";
const multerStore = multer({
    storage: multer.memoryStorage(),
});
app.use(multerStore.array("file"));
app.get("/api/checktoken", tokenchecker_1.checkToken);
app.post("/api/signup", signup_1.signup);
app.post("/api/login", login_1.login);
app.post("/api/postgame", ReleaseProduct_1.postgame);
app.post("/api/addtocart", Cart_1.AddtoCart);
app.delete("/api/delete/:id", ReleaseProduct_1.deletegameByID);
app.put("/api/changepassword", login_1.changePassword);
app.put("/api/updategame/:id", UpdateProduct_1.UpdateGame);
app.get("/api/fetchgame", Fetchgame_1.Fetchgame);
app.get("/api/fetchcategory", Fetchgame_1.FetchCategories);
app.get("/api/showproduct", SPIC_1.getproductinCart);
app.delete("/api/deletecart", decode_1.auth, Cart_1.DeleteCart);
app.delete("/api/deletecheckout", Cart_1.DeleteItemCheckOut);
app.post("/api/checkout", checkout_1.Checkout);
app.get("/api/showtrans", showtransaction_1.showtrans);
app.get("/api/getgame", ShowgamebyID_1.getGameByID);
app.get("/api/getuser", UserbyId_1.getUserbyID);
const PORT = parseInt((process.env.PORT || '4000'), 10);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
