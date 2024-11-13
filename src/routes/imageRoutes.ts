import { Router } from 'express';
import { ImageController } from '../controllers/ImageController';
import multer from 'multer';

const imageRouter = Router();

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });

  const upload = multer({ storage: storage });
//imageRouter.post('/images', ImageController.uploadImages);
imageRouter.post('/hotels/:hotelId/images',
     upload.array('images'), 
     ImageController.uploadImages);

//module.exports = imageRouter;
export default imageRouter;