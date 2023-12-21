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
const mysql_1 = require("../mysql");
const uuid_1 = require("uuid");
const Checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, productID, totalAmount } = req.body;
        const id = (0, uuid_1.v4)();
        const result = yield Promise.all(productID === null || productID === void 0 ? void 0 : productID.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const client = yield (0, mysql_1.dbConnect)();
            yield client.query(`INSERT INTO Transaction ( Transaction_Id,User_ID, Product_ID, totalAmount, date) VALUES (?,?,?,?,?)`, [id, userID, item, totalAmount, new Date()]);
        })));
        res.status(200).send({
            checkout: "succsec",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.Checkout = Checkout;
