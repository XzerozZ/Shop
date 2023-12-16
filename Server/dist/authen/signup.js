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
const server_1 = require("../server");
const hash_1 = require("../hash");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.Database)();
        const { username, email, password } = req.body;
        const user = {
            username,
            email,
            password: yield (0, hash_1.hashPassword)(password)
        };
        yield server_1.client.db('Webpro').collection('user').insertOne(user);
        res.status(200).send({ user });
        yield server_1.client.close();
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
