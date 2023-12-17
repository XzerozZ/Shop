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
exports.getproductinCart = void 0;
const server_1 = require("../server");
const getproductinCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.query;
        const matching = yield server_1.client.db("Webpro").collection("Cart")
            .aggregate([
            {
                $match: {
                    userID: userID
                },
            },
            {
                $lookup: {
                    from: "product",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productinfo",
                },
            },
        ])
            .toArray();
        // Send the response with the retrieved product information
        res.status(200).send({ message: "Get Product in cart", matching });
    }
    catch (error) {
        // Handle errors and send an error response
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.getproductinCart = getproductinCart;
