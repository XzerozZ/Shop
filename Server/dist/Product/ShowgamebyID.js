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
exports.getGameByID = void 0;
const server_1 = require("../server");
const mongodb_1 = require("mongodb");
const getGameByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(400).send("Bad Request: Missing 'id' parameter");
            return;
        }
        yield (0, server_1.Database)();
        const matching = yield server_1.client
            .db("Webpro")
            .collection("product")
            .aggregate([
            {
                $match: {
                    _id: new mongodb_1.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "dev",
                    localField: "developer",
                    foreignField: "_id",
                    as: "developer_info",
                },
            },
            { $unwind: "$developer_info" },
            {
                $lookup: {
                    from: "publisher",
                    localField: "publisher",
                    foreignField: "_id",
                    as: "publisherInfo",
                },
            },
            { $unwind: "$publisherInfo" },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails" },
        ])
            .toArray();
        if (matching.length === 0) {
            res.status(404).send("Not Found");
        }
        else {
            res.status(200).send(matching);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getGameByID = getGameByID;
