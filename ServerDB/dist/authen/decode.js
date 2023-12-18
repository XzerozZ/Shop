"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'No token, authorization denied' });
            return false;
        }
        const decoded = jsonwebtoken_1.default.verify(token, server_1.secret);
        res.status(200).json({ message: 'have token', decoded });
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.auth = auth;
