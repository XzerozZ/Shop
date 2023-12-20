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
exports.showtrans = void 0;
const mysql_1 = require("../mysql");
const showtrans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield (0, mysql_1.dbConnect)();
        const result = yield client.query(`SELECT Transaction_Id _id , totalAmount , Product.Product_Id Product_Id,Product.name name  FROM Transaction Left JOIN Product ON Transaction.Product_Id = Product.Product_Id WHERE User_Id = ?`, [id]);
        const trans = Array.isArray(result[0])
            ? result[0].reduce((acc, item) => {
                const existingItem = acc.find((i) => i._id === item._id);
                if (existingItem) {
                    existingItem.Product.push({
                        _id: String(item.Product_Id),
                        name: item.name
                    });
                }
                else {
                    acc.push({
                        _id: item._id,
                        totalAmount: item.totalAmount,
                        date: item.date,
                        Product: [
                            {
                                _id: String(item.Product_Id),
                                name: item.name
                            },
                        ],
                    });
                }
                return acc;
            }, [])
            : [];
        res.status(200).send(trans);
    }
    catch (error) {
        console.log(error);
    }
});
exports.showtrans = showtrans;
