"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
class ValidationMiddleware {
    static validateHotelData(req, res, next) {
        // Implement validation logic for hotel data
        const { title, description, guestCount } = req.body;
        if (!title || !description || guestCount < 1) {
            return res.status(400).json({ error: 'Invalid hotel data' });
        }
        next();
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
