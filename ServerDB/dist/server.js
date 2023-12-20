"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("./authen/signup");
const login_1 = require("./authen/login");
const Cart_1 = require("./Product/Cart");
const ReleaseProduct_1 = require("./admin/ReleaseProduct");
const updateproduct_1 = require("./admin/updateproduct");
const tokenchecker_1 = require("./authen/tokenchecker");
const Fetchgame_1 = require("./Product/Fetchgame");
const showtransaction_1 = require("./data/showtransaction");
const SPIC_1 = require("./Product/SPIC");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const checkout_1 = require("./data/checkout");
const ShowgamebyID_1 = require("./Product/ShowgamebyID");
const UserbyId_1 = require("./data/UserbyId");
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
app.get("/api/checktoken", tokenchecker_1.checkToken);
app.post("/api/signup", signup_1.signup);
app.post("/api/login", login_1.login);
app.post("/api/postgame", ReleaseProduct_1.postgame);
app.post("/api/addtocart", Cart_1.AddtoCart);
app.delete("/api/delete/:id", ReleaseProduct_1.deletegameByID);
app.put("/api/changepassword", login_1.changePassword);
app.put("/api/updategame/:id", updateproduct_1.UpdateGame);
app.get("/api/fetchgame", Fetchgame_1.Fetchgame);
app.get("/api/fetchcategory", Fetchgame_1.FetchCategories);
app.get("/api/showproduct", SPIC_1.getproductinCart);
app.delete("/api/deletecart", Cart_1.DeleteCart);
app.delete("/api/deletecheckout", Cart_1.DeleteItemCheckOut);
app.post("/api/checkout", checkout_1.Checkout);
app.get("/api/showtrans/:id", showtransaction_1.showtrans);
app.get("/api/getgame", ShowgamebyID_1.getGameByID);
app.get("/api/getuser", UserbyId_1.getUserbyID);
app.get("/api/logout", login_1.logout);
const PORT = parseInt((process.env.PORT || '4001'), 10);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
