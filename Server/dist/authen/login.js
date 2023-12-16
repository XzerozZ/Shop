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
exports.changePassword = exports.login = void 0;
const server_1 = require("../server");
const hash_1 = require("../hash");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const { email, password } = req.body;
        const findEmail = yield server_1.client.db('Webpro').collection('user').findOne({ email: email });
        if (!findEmail) {
            res.status(400).json({ message: 'email not found' });
            return false;
        }
        const MatchPassword = yield (0, hash_1.matchPassword)(password, findEmail.password);
        if (!MatchPassword) {
            res.status(400).json({ message: 'password not match' });
            return false;
        }
        res.cookie('user', JSON.stringify(findEmail), { maxAge: 86400e3, httpOnly: true });
        res.status(200).json({ message: 'login success', result: findEmail });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, server_1.Database)();
        const { email, newPassword } = req.body;
        const findEmail = yield server_1.client.db('Webpro').collection('user').findOne({ email: email });
        if (!findEmail) {
            res.send("No User found");
            return false;
        }
        const MatchPassword = yield (0, hash_1.matchPassword)(newPassword, findEmail.password);
        if (MatchPassword) {
            res.send("Password is the same");
            return false;
        }
        const hash = yield (0, hash_1.hashPassword)(newPassword);
        yield server_1.client.db('Webpro').collection('user').updateOne({ email }, { $set: { password: hash } });
        res.status(200).send("Change Password Success");
    }
    catch (error) {
        console.error("Error during password change", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.changePassword = changePassword;
