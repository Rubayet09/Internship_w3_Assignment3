import { Router } from 'express';
import { HotelController } from '../controllers/HotelController';

const hotelRouter = Router();

hotelRouter.post('/hotels', HotelController.createHotel);
hotelRouter.get('/hotels/:hotelId', HotelController.getHotelById);
hotelRouter.put('/hotels/:hotelId', HotelController.updateHotelById);

//module.exports = hotelRouter;
export default hotelRouter;