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
exports.getUserbyID = void 0;
const mysql_1 = require("../mysql");
const getUserbyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { id } = req.query;
        if (!id) {
            res.status(400).send("Bad Request: Missing 'id' parameter");
            return;
        }
        const result = yield client.query(`
    SELECT distinct * FROM user
    Where User_Id = ?;`, [id]);
        res.status(200).send(result[0]);
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getUserbyID = getUserbyID;
