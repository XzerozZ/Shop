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
const server_1 = require("../server");
const getUserbyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const { userID } = req.params;
        const result = yield server_1.client.db("Webpro").collection('user').findOne({ _Id: userID });
        console.log('Fetched data:', result);
        res.status(200).send(result);
    }
    catch (_a) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.getUserbyID = getUserbyID;
