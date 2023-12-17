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
exports.UpdateGame = void 0;
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
const UpdateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { price } = req.body;
        if (!price) {
            res.status(400).json({ error: "Bad Request: 'price' is required" });
            return;
        }
        yield (0, server_1.Database)();
        const objectId = new mongodb_1.ObjectId(id);
        const change = yield server_1.client
            .db("Webpro")
            .collection("product")
            .updateOne({ _id: objectId }, { $set: { price } });
        console.log("ObjectId:", objectId);
        console.log("Update Result:", change);
        if (change.modifiedCount === 1) {
            res.status(200).json({ message: "Update successful" });
        }
        else {
            res.status(404).json({ error: "Not Found: Document not updated" });
        }
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.UpdateGame = UpdateGame;
