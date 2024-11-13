"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageController_1 = require("../controllers/ImageController");
const imageRouter = (0, express_1.Router)();
imageRouter.post('/images', ImageController_1.ImageController.uploadImages);
module.exports = imageRouter;
