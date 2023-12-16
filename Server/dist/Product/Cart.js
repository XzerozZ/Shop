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
exports.DeleteCart = exports.AddtoCart = void 0;
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
const AddtoCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const { userID, productID } = req.query;
        const data = {
            userID: new mongodb_1.ObjectId(Number(userID)),
            productID: new mongodb_1.ObjectId(Number(productID)),
        };
        const result = yield server_1.client
            .db("Webpro")
            .collection("Cart")
            .insertOne(data);
        res.status(200).send({ message: "Add to cart", result: result });
        console.log("Add to cart");
    }
    catch (error) {
        console.log(error);
    }
});
exports.AddtoCart = AddtoCart;
const DeleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const { id } = req.query;
        const deleteCart = yield server_1.client
            .db("Webpro")
            .collection("Cart")
            .deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (deleteCart.deletedCount === 1) {
            res.status(200).send({ message: "Deleted from cart", deleteCart });
        }
        else {
            res.status(404).send({ error: "Item not found in cart" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.DeleteCart = DeleteCart;
