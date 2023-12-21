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
const mysql_1 = require("../mysql");
const getproductinCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { userID } = req.query;
        const result = yield client.query('SELECT * FROM cart left join Product on Cart.Product_Id = Product.Product_Id  WHERE User_Id =?', [userID]);
        const matching = result[0].map((item) => ({
            _id: item.Cart_Id,
            userID: item.User_Id,
            productID: item.Product_Id,
            productinfo: {
                _id: item.Product_Id,
                name: item.name,
                price: item.price,
                date: item.release_date
            },
        }));
        res.status(200).send(matching);
    }
    catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.getproductinCart = getproductinCart;
