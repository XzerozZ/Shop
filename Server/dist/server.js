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
exports.Database = exports.client = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("./authen/signup");
const login_1 = require("./authen/login");
const Developer_1 = require("./admin/Developer");
const Publisher_1 = require("./admin/Publisher");
const Releasebook_1 = require("./admin/Releasebook");
const app = (0, express_1.default)();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const mongoURL = "mongodb+srv://Valhir:Dino2064!@cluster0.vts6job.mongodb.net/";
exports.client = new MongoClient(mongoURL);
app.use(cors());
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
const multerStore = multer({
    storage: multer.memoryStorage(),
});
app.use(multerStore.array("file"));
app.post("/api/signup", signup_1.signup);
app.post("/api/login", login_1.login);
app.post("/api/dev", Developer_1.Adddev);
app.post("/api/publisher", Publisher_1.AddPublisher);
app.post("/api/postbook", Releasebook_1.postbook);
const PORT = parseInt((process.env.PORT || '4000'), 10);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
