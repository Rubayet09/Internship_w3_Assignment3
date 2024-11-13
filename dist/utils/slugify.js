"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const createSlug = (text) => {
    return (0, slugify_1.default)(text, { lower: true, strict: true });
};
exports.createSlug = createSlug;
