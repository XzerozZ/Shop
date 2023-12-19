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
const mysql_1 = require("../mysql"); // Assuming you have a database connection pool
const getGameByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { id } = req.query;
        if (!id) {
            res.status(400).send("Bad Request: Missing 'id' parameter");
            return;
        }
        const result = yield client.query(`
    SELECT distinct
    product.*,
    developer.name AS developer_info,
    developer.facebook as facebook,
    developer.instagram as instagram,
    developer.X as X,
    developer.youtube as youtube,
    developer.name AS publisher_info,
    category.name AS category
  FROM
    product
    LEFT JOIN dev_product ON product.Product_Id = dev_product.Product_Id
    LEFT JOIN developer ON dev_product.Developer_Id = developer.Developer_Id
    LEFT JOIN publisher ON product.Publisher_Id = publisher.Publisher_Id
    LEFT JOIN product_cate ON product.Product_Id = product_cate.Product_Id
    LEFT JOIN category ON product_cate.Category_Id = category.Category_Id
    Where product.Product_Id = ?;`, [id]);
        res.status(200).send(result[0]);
        const firstImageURL = result[0][0].image[1];
        console.log(firstImageURL);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getGameByID = getGameByID;
