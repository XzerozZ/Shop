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
exports.createDev = void 0;
const mysql_1 = require("../mysql");
const createDev = (devName, facebook, instagram, X, youtube) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, mysql_1.dbConnect)();
    const [existingDev] = yield client.query('SELECT Developer_Id FROM Developer WHERE name = ?', [devName]);
    if (existingDev.length > 0) {
        return existingDev[0].Developer_Id;
    }
    const [newDev] = yield client.query('INSERT INTO Developer (name, facebook, instagram, X, youtube) VALUES (?, ?, ?, ?, ?)', [devName, facebook, instagram, X, youtube]);
    return newDev.insertId;
});
exports.createDev = createDev;
