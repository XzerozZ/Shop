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
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const client = yield (0, mysql_1.dbConnect)();
        const { username, email, password } = req.body;
        // Check if the email already exists using COUNT
        const emailCountResult = yield client.query(`SELECT COUNT(*) as count FROM user WHERE email = ?`, [email]);
        // Extract the count value from the result
        const emailCount = (_a = emailCountResult[0]) === null || _a === void 0 ? void 0 : _a.count;
        // Check if the email count is greater than 0
        if (emailCount > 0) {
            return res.status(400).send({
                message: "Email already in use",
            });
        }
        // Insert new user
        yield client.query(`INSERT INTO User(username, email, password) VALUES (?, ?, ?)`, [username, email, password]);
        return res.status(201).send({
            message: "Sign up successful",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
});
exports.signup = signup;