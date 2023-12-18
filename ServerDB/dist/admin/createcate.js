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
exports.createCategory = void 0;
const mysql_1 = require("../mysql");
const createCategory = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, mysql_1.dbConnect)();
    const [existingCategory] = yield client.query('SELECT Category_Id FROM Category WHERE name = ?', [categoryName]);
    if (existingCategory.length > 0) {
        return existingCategory[0].Category_Id;
    }
    const [newCategory] = yield client.query('INSERT INTO Category (name) VALUES (?)', [categoryName]);
    return newCategory.insertId;
});
exports.createCategory = createCategory;
