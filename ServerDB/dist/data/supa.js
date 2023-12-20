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
exports.upLoadeVideo = exports.upLoadePDF = exports.upLoadeIMG = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const uuid_1 = require("uuid");
const supabaseUrl = "https://xuqrfjhcdecxedzbxcza.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cXJmamhjZGVjeGVkemJ4Y3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5NDQ1NDksImV4cCI6MjAxODUyMDU0OX0.FF91hbkB7tEoshs9pbXXGtJK6xmxWc0EceJeC3yVr24";
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const upLoadeIMG = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = "images/" + (0, uuid_1.v4)() + ".jpg";
    const { error } = yield exports.supabase.storage
        .from("aaaaa")
        .upload(fileName, file, { cacheControl: "image/jpg" });
    if (error) {
        throw error;
    }
    const { data } = yield exports.supabase.storage.from("aaaa").getPublicUrl(fileName);
    return data.publicUrl;
});
exports.upLoadeIMG = upLoadeIMG;
const upLoadePDF = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = "pdf/" + (0, uuid_1.v4)() + ".pdf";
    const { error } = yield exports.supabase.storage
        .from("aaaa")
        .upload(fileName, file, { cacheControl: "application/pdf" });
    if (error) {
        throw error;
    }
    const { data } = yield exports.supabase.storage.from("aaaa").getPublicUrl(fileName);
    return data.publicUrl;
});
exports.upLoadePDF = upLoadePDF;
const upLoadeVideo = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = "mp4/" + (0, uuid_1.v4)() + ".mp4";
    const { error } = yield exports.supabase.storage
        .from("aaaa")
        .upload(fileName, file, { cacheControl: "video/mp4" });
    if (error) {
        throw error;
    }
    const { data } = yield exports.supabase.storage.from("aaaa").getPublicUrl(fileName);
    return data.publicUrl;
});
exports.upLoadeVideo = upLoadeVideo;
