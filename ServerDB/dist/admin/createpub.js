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
exports.createPublisher = void 0;
const mysql_1 = require("../mysql");
const createPublisher = (publisherName) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, mysql_1.dbConnect)();
    const [existingPublisher] = yield client.query('SELECT Publisher_Id FROM Publisher WHERE name = ?', [publisherName]);
    if (existingPublisher.length > 0) {
        return existingPublisher[0].Publisher_Id;
    }
    const [newPublisher] = yield client.query('INSERT INTO Publisher (name) VALUES (?)', [publisherName]);
    return newPublisher.insertId;
});
exports.createPublisher = createPublisher;
