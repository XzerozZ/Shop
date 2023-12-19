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
exports.deletegameByID = exports.postgame = void 0;
const mysql_1 = require("../mysql");
const createdev_1 = require("./createdev");
const createpub_1 = require("./createpub");
const createcate_1 = require("./createcate");
const supa_1 = require("../data/supa");
const postgame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFile = req.files;
        const url = yield Promise.all(dataFile.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                const url = yield (0, supa_1.upLoadeIMG)(file.buffer);
                return url;
            }
            else if (file.mimetype === "application/pdf") {
                const url = yield (0, supa_1.upLoadePDF)(file.buffer);
                return url;
            }
            else if (file.mimetype === "video/mp4") {
                const url = yield (0, supa_1.upLoadeVideo)(file.buffer);
                return url;
            }
        })));
        const { name, dev, price, description, publisher, category, facebook, instagram, X, youtube } = req.body;
        const client = yield (0, mysql_1.dbConnect)();
        const imagedata = Promise.all(url === null || url === void 0 ? void 0 : url.map((item) => {
            if (item && item.match(/\.jpg$/) && item !== undefined && item !== null) {
                return item;
            }
        }));
        const pdfdata = Promise.all(url === null || url === void 0 ? void 0 : url.map((item) => {
            if (item && item.match(/.pdf$/) && item !== undefined && item !== null) {
                return item;
            }
        }));
        const videodata = Promise.all(url === null || url === void 0 ? void 0 : url.map((item) => {
            if (item && item.match(/.mp4$/) && item !== undefined && item !== null) {
                return item;
            }
            else {
                return false;
            }
        }));
        const pdf = yield pdfdata;
        const image = yield imagedata;
        const video = yield videodata;
        const sanitizedImage = image.map((url) => url || '');
        const publisherId = yield (0, createpub_1.createPublisher)(publisher);
        const developerId = yield (0, createdev_1.createDev)(dev, facebook, instagram, X, youtube);
        const categoryId = yield (0, createcate_1.createCategory)(category);
        const data = {
            name,
            price,
            image: sanitizedImage.slice(0, 5),
            video: video[0],
            description,
            release_date: new Date(),
        };
        console.log('Sanitized Image:', sanitizedImage);
        console.log('Data:', data.video);
        // add game
        const addGame = yield client.query(`INSERT INTO 
            product (name, price,release_date, image_link1 , image_link2 ,image_link3 ,image_link4 ,image_link5 , video, description, Publisher_Id) VALUES (?, ?,?, ?,?,?,?,?, ?, ?, ?)`, [data.name, data.price, data.release_date, data.image[0], data.image[1], data.image[2], data.image[3], data.image[4], data.video, data.description, publisherId]);
        const product = yield client.query(`SELECT Product_Id FROM product WHERE name = "${data.name}"`);
        const devProductResult = yield client.query('INSERT INTO dev_product (Developer_Id, Product_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE Developer_Id=VALUES(Developer_Id), Product_Id=VALUES(Product_Id)', [developerId, product[0][0].Product_Id]);
        const productCategoryResult = yield client.query('INSERT INTO product_cate (Product_Id, Category_Id) VALUES (?, ?) ON DUPLICATE KEY UPDATE Product_Id=VALUES(Product_Id), Category_Id=VALUES(Category_Id)', [product[0][0].Product_Id, categoryId]);
        res.status(200).send('Product added successfully');
        res.send(product[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.postgame = postgame;
const deletegameByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = (0, mysql_1.dbConnect)();
        const { id } = req.params;
        const [result] = yield pool.execute("DELETE FROM product WHERE Product_Id = ?", [id]);
        pool.end();
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error",
        });
    }
});
exports.deletegameByID = deletegameByID;
