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
        const client = yield (0, mysql_1.dbConnect)();
        const { id } = req.params;
        console.log('UserID:', id);
        const data = yield client.query('SELECT * FROM transaction WHERE User_Id = ?', [id]);
        console.log('Fetched data:', data[0]);
        res.status(200).send(data[0]);
    }
    catch (_a) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.showtrans = showtrans;
