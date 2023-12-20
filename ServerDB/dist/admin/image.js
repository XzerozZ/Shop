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
exports.postimg = void 0;
const supa_1 = require("../data/supa");
const postimg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFile = req.files;
        const url = yield Promise.all(dataFile.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                return yield (0, supa_1.upLoadeIMG)(file.buffer);
            }
            else if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") {
                return yield (0, supa_1.upLoadeVideo)(file.buffer);
            }
        })));
        res.status(200).send(url);
    }
    catch (error) {
        console.log(error);
    }
});
exports.postimg = postimg;
