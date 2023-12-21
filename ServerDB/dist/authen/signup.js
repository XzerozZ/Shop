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
exports.signup = void 0;
const mysql_1 = require("../mysql");
const hash_1 = require("../hash");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { username, email, password } = req.body;
        const findemail = yield client.query("SELECT * FROM user WHERE email = ?", [email]);
        if (findemail[0] != 0) {
            return res.status(400).send({
                message: "Email already in use"
            });
        }
        const hash = yield (0, hash_1.hashPassword)(password);
        // Insert new user
        yield client.query(`INSERT INTO User(username, email, password) VALUES (?, ?, ?)`, [username, email, hash]);
        return res.status(201).send({
            message: "Sign up successful",
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
});
exports.signup = signup;
