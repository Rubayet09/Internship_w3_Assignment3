"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HotelController_1 = require("../controllers/HotelController");
const hotelRouter = (0, express_1.Router)();
hotelRouter.post('/hotel', HotelController_1.HotelController.createHotel);
hotelRouter.get('/hotel/:hotelId', HotelController_1.HotelController.getHotelById);
hotelRouter.put('/hotel/:hotelId', HotelController_1.HotelController.updateHotelById);
module.exports = hotelRouter;
