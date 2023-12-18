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
const Checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, productID, totalAmount } = req.body;
        const client = (0, mysql_1.dbConnect)();
        const productIDArray = productID.map((item) => parseInt(item, 10));
        const currentDate = new Date();
        const result = yield client.query('INSERT INTO Transaction (User_ID, Product_ID, totalAmount, date)VALUES (?, ?, ?, ?)', [userID, JSON.stringify(productIDArray), totalAmount, currentDate]);
        res.status(200).send({ checkout: "success", data: result.rows[0] });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.Checkout = Checkout;