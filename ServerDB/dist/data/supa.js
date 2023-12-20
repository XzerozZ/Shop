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
exports.upLoadeVideo = exports.upLoadeIMG = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const uuid_1 = require("uuid");
const supabaseUrl = "https://fxttvzupnaarxqpbfdhr.supabase.co/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dHR2enVwbmFhcnhxcGJmZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NDQzMDAsImV4cCI6MjAxNzUyMDMwMH0.uHsh_YhrJ5UzcwTXwipnF-0guZ6k8sKuYFwaMnpW9ls";
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const upLoadeIMG = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = "images/" + (0, uuid_1.v4)() + ".jpg";
    const { error } = yield exports.supabase.storage
        .from("BIZWEB")
        .upload(fileName, file, { cacheControl: "image/jpg" });
    if (error) {
        throw error;
    }
    const { data } = yield exports.supabase.storage.from("BIZWEB").getPublicUrl(fileName);
    return data.publicUrl;
});
exports.upLoadeIMG = upLoadeIMG;
const upLoadeVideo = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = "video/" + (0, uuid_1.v4)() + ".mp4";
    const { error } = yield exports.supabase.storage
        .from("BIZWEB")
        .upload(fileName, file, { cacheControl: "video/mp4" });
    if (error) {
        throw error;
    }
    const { data } = yield exports.supabase.storage.from("BIZWEB").getPublicUrl(fileName);
    return data.publicUrl;
});
exports.upLoadeVideo = upLoadeVideo;
