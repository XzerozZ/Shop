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
const mysql_1 = require("../mysql"); // Assuming you have a database connection pool
const Fetchgame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const query = `
      SELECT
        product.*,
        developer.name AS developer_info,
        developer.facebook as facebook,
        developer.instagram as instagram,
        developer.X as X,
        developer.youtube as youtube,
        publisher.name AS publisher_info,
        category.name AS category,
        imageset.image1 AS img1,
        imageset.image2 AS img2,
        imageset.image3 AS img3,
        imageset.image4 AS img4,
        imageset.image5 AS img5
      FROM
        product
        LEFT JOIN dev_product ON product.Product_Id = dev_product.Product_Id
        LEFT JOIN developer ON dev_product.Developer_Id = developer.Developer_Id
        LEFT JOIN publisher ON product.Publisher_Id = publisher.Publisher_Id
        LEFT JOIN product_cate ON product.Product_Id = product_cate.Product_Id
        LEFT JOIN category ON product_cate.Category_Id = category.Category_Id
        LEFT JOIN imageset on imageset.Product_Id = Product.Product_Id;`;
        const result = yield client.query(query);
        const mappedResult = result[0].map((item) => ({
            _id: item.Product_Id,
            name: item.name,
            price: item.price,
            video: item.video,
            image: [
                item.img1,
                item.img2,
                item.img3,
                item.img4,
                item.img5,
            ],
            release_date: item.release_date,
            description: item.description,
            developer_info: {
                name: item.developer_info,
                facebook: item.facebook,
                instagram: item.instagram,
                X: item.X,
                youtube: item.youtube,
            },
            publisherInfo: {
                _id: item.Publisher_Id,
                name: item.publisher_info,
            },
            categoryDetails: {
                name: item.category,
            },
        }));
        res.status(200).send(mappedResult);
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.Fetchgame = Fetchgame;
const FetchCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const query = `
      SELECT
      category.*
      FROM
      category;
      `;
        const result = yield client.query(query);
        res.status(200).send(result[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.FetchCategories = FetchCategories;
