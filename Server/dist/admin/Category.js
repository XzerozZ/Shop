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
exports.AddCategory = void 0;
const server_1 = require("../server");
const AddCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield (0, server_1.Database)();
        if (!name) {
            res.status(400).send({ message: "Enter the name of category" });
            return false;
        }
        const find = yield server_1.client.db("Webpro").collection("catagory").findOne({ name });
        if (find) {
            res.status(400).send({ message: "Catagory already exists" });
            return false;
        }
        const result = yield server_1.client.db("Webpro").collection("category").insertOne({ name });
        res.status(200).send({ result });
    }
    catch (error) {
        console.log("Error", error);
    }
});
exports.AddCategory = AddCategory;