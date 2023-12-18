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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.login = void 0;
const mysql_1 = require("../mysql");
const hash_1 = require("../hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { email, password } = req.body;
        const data = yield client.query('SELECT * FROM user WHERE email = ?', [email]);
        if (data.length === 0 && !(yield (0, hash_1.matchPassword)(password, data[0].password))) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        console.log(data);
        const payload = { id: data[0]._id };
        const token = jsonwebtoken_1.default.sign(payload, server_1.secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login success', result: data[0] });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { email, newPassword } = req.body;
        const data = yield client.query('SELECT * FROM user WHERE email = ?', [email]);
        if (data[0].length === 0 || newPassword === data[0].password) {
            res.status(400).send("Error. Please try again!");
            return;
        }
        const hash = yield (0, hash_1.hashPassword)(newPassword);
        yield client.query('UPDATE user SET password = ? WHERE email = ?', [hash, email]);
        res.status(200).send("Change password succeeded");
    }
    catch (error) {
        console.error("Error during password change", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.changePassword = changePassword;
