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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModels_1 = require("../models/userModels");
const Token_1 = require("../Token");
exports.userRouter = express_1.default.Router();
// POST /api/users/signin
exports.userRouter.post('/signin', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.UserModel.findOne({ email: req.body.email });
    if (user) {
        if (bcryptjs_1.default.compareSync(req.body.password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: (0, Token_1.generateToken)(user),
            });
            return;
        }
    }
    res.status(401).json({ message: 'Invalid email or password' });
})));
exports.userRouter.post('/signup', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password),
    });
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: (0, Token_1.generateToken)(user),
    });
})));
exports.userRouter.put('/profile', Token_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.UserModel.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcryptjs_1.default.hashSync(req.body.password, 8);
        }
        const updatedUser = yield user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, Token_1.generateToken)(updatedUser),
        });
        return;
    }
    res.status(404).json({ message: 'User not found' });
})));
