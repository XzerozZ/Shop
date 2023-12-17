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
exports.FetchCategories = exports.Fetchgame = void 0;
const server_1 = require("../server");
const Fetchgame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const result = yield server_1.client
            .db("Webpro")
            .collection("product")
            .aggregate([
            {
                $lookup: {
                    from: "dev",
                    localField: "developer",
                    foreignField: "_id",
                    as: "developer_info"
                },
            },
            { $unwind: "$developer_info", },
            {
                $lookup: {
                    from: "publisher",
                    localField: "publisher",
                    foreignField: "_id",
                    as: "publisherInfo",
                },
            },
            { $unwind: "$publisherInfo", },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails", },
        ])
            .toArray();
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
});
exports.Fetchgame = Fetchgame;
const FetchCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const result = yield server_1.client
            .db("Webpro")
            .collection("categories")
            .find().toArray();
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
});
exports.FetchCategories = FetchCategories;
