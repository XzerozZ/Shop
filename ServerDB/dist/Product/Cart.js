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
exports.DeleteItemCheckOut = exports.DeleteCart = exports.AddtoCart = void 0;
const mysql_1 = require("../mysql"); // Assuming you have a database connection pool
const AddtoCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, productID } = req.query;
        const client = yield (0, mysql_1.dbConnect)();
        if (!userID || !productID) {
            res.status(400).send({ message: "userID and productID are required in the query parameters." });
            return;
        }
        // Fetch User_Id from the users table
        const userResult = yield client.query('SELECT User_Id FROM user WHERE User_Id = ?', [userID]);
        const userExists = userResult.length > 0;
        if (!userExists) {
            res.status(404).send({ error: "User not found" });
            return;
        }
        // Fetch Product_Id from the products table
        const productResult = yield client.query('SELECT Product_Id FROM product WHERE Product_Id = ?', [productID]);
        const productExists = productResult.length > 0;
        if (!productExists) {
            res.status(404).send({ error: "Product not found" });
            return;
        }
        const result = yield client.query('INSERT INTO Cart (User_Id, Product_Id) VALUES (?, ?)', [userID, productID]);
        // Check if result.rows is defined before accessing the property '0'
        const insertedRow = result.rows && result.rows.length > 0 ? result.rows[0] : null;
        res.status(200).send({ message: "Add to cart", result: insertedRow });
        console.log("Add to cart");
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.AddtoCart = AddtoCart;
const DeleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const client = yield (0, mysql_1.dbConnect)();
        const result = yield client.query('Delete from Cart where Cart_Id = ?', [id]);
        res.status(200).send({ message: "Deleted from cart", result: result.rows[0] });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
        console.log(error);
    }
});
exports.DeleteCart = DeleteCart;
const DeleteItemCheckOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.query;
        const client = yield (0, mysql_1.dbConnect)();
        const result = yield client.query('DELETE FROM Cart WHERE user_ID = ?', [userID]);
        res.status(200).send({ message: "Deleted from cart", result: result.rows });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.DeleteItemCheckOut = DeleteItemCheckOut;
