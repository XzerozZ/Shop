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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookByID = exports.postbook = void 0;
const supa_1 = require("../data/supa");
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
const postbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFile = req.files;
        const url = yield Promise.all(dataFile.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                const url = yield (0, supa_1.upLoadeIMG)(file.buffer);
                return url;
            }
            else if (file.mimetype === "application/pdf") {
                const url = yield (0, supa_1.upLoadePDF)(file.buffer);
                return url;
            }
            else if (file.mimetype === "video/mp4") {
                const url = yield (0, supa_1.upLoadeVideo)(file.buffer);
                return url;
            }
        })));
        const { title, dev, price, description, publisher, category } = req.body;
        yield server_1.client.connect();
        const data = {
            title,
            developer: new mongodb_1.ObjectId(dev),
            publisher: new mongodb_1.ObjectId(publisher),
            category: new mongodb_1.ObjectId(category),
            price,
            description,
            image: url.slice(0, 4),
            video: url[5],
            date: new Date()
        };
        yield server_1.client.db("Webpro").collection("product").insertOne(data);
        yield server_1.client.close();
        res.status(200).send({
            status: "success",
            data: data,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.postbook = postbook;
const deleteBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const { id } = req.params;
        const result = yield server_1.client.db("Webpro").collection("product").deleteOne({ _id: new mongodb_1.ObjectId(id) });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.deleteBookByID = deleteBookByID;
