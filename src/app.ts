import express from 'express';

import cors from 'cors';
import { HotelService } from './services/HotelService';
import hotelRoutes from './routes/hotelRoutes';
import imageRoutes from './routes/imageRoutes';

//const hotelRoutes = require('./routes/hotelRoutes');
//const imageRoutes = require('./routes/imageRoutes');

// import { HotelService } from './services/HotelService';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Initialize HotelService
HotelService.initialize().catch(console.error);

app.use('/api/hotels', hotelRoutes);
app.use('/api/images', imageRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;