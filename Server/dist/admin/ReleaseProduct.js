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
exports.deletegameByID = exports.postgame = void 0;
const supa_1 = require("../data/supa");
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
const postgame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { name, dev, price, description, publisher, category, facebook, instagram, X, youtube } = req.body;
        yield server_1.client.connect();
        let developer = yield server_1.client
            .db("Webpro")
            .collection("dev")
            .findOne({ name: dev });
        let developerId;
        if (!developer) {
            // If developer doesn't exist, insert a new record
            const devResult = yield server_1.client
                .db("Webpro")
                .collection("dev")
                .insertOne({ name: dev, facebook: facebook, instagram: instagram, X: X, youtube: youtube });
            developerId = devResult.insertedId;
        }
        else {
            developerId = developer._id;
        }
        // Check if publisher exists
        let pub = yield server_1.client
            .db("Webpro")
            .collection("publisher")
            .findOne({ name: publisher });
        let publisherId;
        if (!pub) {
            // If publisher doesn't exist, insert a new record
            const pubResult = yield server_1.client
                .db("Webpro")
                .collection("publisher")
                .insertOne({ name: publisher });
            publisherId = pubResult.insertedId;
        }
        else {
            publisherId = pub._id;
        }
        // Check if category exists
        let cat = yield server_1.client
            .db("Webpro")
            .collection("categories")
            .findOne({ name: category });
        let categoryId;
        if (!cat) {
            // If category doesn't exist, insert a new record
            const catResult = yield server_1.client
                .db("Webpro")
                .collection("categories")
                .insertOne({ name: category });
            categoryId = catResult.insertedId;
        }
        else {
            categoryId = cat._id;
        }
        const data = {
            name,
            developer: developerId,
            publisher: publisherId,
            category: categoryId,
            price: Number(price),
            description,
            image: url.slice(0, 5),
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
exports.postgame = postgame;
// Delete books
const deletegameByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deletegameByID = deletegameByID;
