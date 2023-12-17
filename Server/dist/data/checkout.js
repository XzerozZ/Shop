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
exports.Checkout = void 0;
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
const Checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, server_1.Database)();
    try {
        const { userID, productID } = req.body;
        const product = Promise.all(productID === null || productID === void 0 ? void 0 : productID.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return new mongodb_1.ObjectId(item);
        })));
        const totalPriceAggregation = yield server_1.client
            .db("Webpro")
            .collection("Cart")
            .aggregate([
            {
                $match: {
                    userID: userID,
                },
            },
            {
                $addFields: {
                    productIDObjectId: { $toObjectId: "$productID" },
                },
            },
            {
                $lookup: {
                    from: "product",
                    localField: "productIDObjectId",
                    foreignField: "_id",
                    as: "productinfo",
                },
            },
            {
                $unwind: "$productinfo",
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$productinfo.price" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: 1,
                },
            },
        ])
            .toArray();
        const totalAmount = totalPriceAggregation[0].totalPrice;
        const transaction = {
            userID,
            productID: yield product,
            totalAmount,
            date: new Date(),
        };
        const result = yield server_1.client
            .db("Webpro")
            .collection("Transaction")
            .insertOne(transaction)
            .catch((error) => {
            console.log(error);
        });
        res.status(200).send({ checkout: "success", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Checkout = Checkout;