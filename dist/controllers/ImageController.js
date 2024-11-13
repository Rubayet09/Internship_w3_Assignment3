"use strict";
// import { Request, Response } from 'express';
// import multer from 'multer';
// import { HotelService } from '../services/HotelService';
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const multer_1 = __importDefault(require("multer"));
const HotelService_1 = require("../services/HotelService");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
class ImageController {
}
exports.ImageController = ImageController;
_a = ImageController;
ImageController.uploadImages = [
    upload.array('images'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { hotelId } = req.body;
            // Type check for req.files and handle undefined or invalid type cases
            if (!req.files || !Array.isArray(req.files)) {
                throw new Error('No files uploaded or invalid file format');
            }
            const imageUrls = yield HotelService_1.HotelService.updateHotelImages(hotelId, req.files);
            res.status(200).json({ imageUrls });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    })
];
