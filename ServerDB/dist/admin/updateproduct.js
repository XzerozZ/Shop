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
exports.UpdateGame = void 0;
const mysql_1 = require("../mysql");
const UpdateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { price } = req.body;
        const client = yield (0, mysql_1.dbConnect)();
        if (!price) {
            res.status(400).json({ error: "Bad Request: 'price' is required" });
            return;
        }
        const result = yield client.query(`UPDATE product SET price = ? WHERE Product_Id =  ?`, [price, id]);
        console.log("Update Result:", result);
        if (result.rowCount === 0) {
            res.status(404).json({ error: "Not Found: Document not updated" });
        }
        else {
            res.status(200).json({ message: "Update successful" });
        }
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.UpdateGame = UpdateGame;
