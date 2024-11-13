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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelService = void 0;
const slugify_1 = require("../utils/slugify");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
class HotelService {
    static getHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(this.hotelDataPath, 'utf8');
                return JSON.parse(data);
            }
            catch (error) {
                return [];
            }
        });
    }
    static getHotelById(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.getHotels();
            const hotel = hotels.find((h) => h.id === hotelId);
            if (!hotel) {
                throw new Error('Hotel not found');
            }
            return hotel;
        });
    }
    static createHotel(hotelData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.getHotels();
            const newHotel = {
                id: this.generateUniqueId(),
                slug: (0, slugify_1.createSlug)(hotelData.title),
                images: [],
                title: hotelData.title,
                description: hotelData.description,
                guestCount: hotelData.guestCount,
                bedroomCount: hotelData.bedroomCount,
                bathroomCount: hotelData.bathroomCount,
                amenities: hotelData.amenities,
                host: hotelData.host,
                address: hotelData.address,
                location: hotelData.location,
                rooms: hotelData.rooms,
            };
            hotels.push(newHotel);
            yield this.saveHotels(hotels);
            return newHotel.id;
        });
    }
    static updateHotelById(hotelId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.getHotels();
            const index = hotels.findIndex((h) => h.id === hotelId);
            if (index === -1) {
                throw new Error('Hotel not found');
            }
            const updatedHotel = Object.assign(Object.assign({}, hotels[index]), updatedData);
            hotels[index] = updatedHotel;
            yield this.saveHotels(hotels);
        });
    }
    static generateUniqueId() {
        return (0, uuid_1.v4)();
    }
    static saveHotels(hotels) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.promises.writeFile(this.hotelDataPath, JSON.stringify(hotels, null, 2));
        });
    }
    static updateHotelImages(hotelId, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.getHotels();
            const hotel = hotels.find((h) => h.id === hotelId);
            if (!hotel) {
                throw new Error('Hotel not found');
            }
            const imageUrls = yield Promise.all(images.map((image) => __awaiter(this, void 0, void 0, function* () {
                const fileExtension = path_1.default.extname(image.originalname);
                const imageUrl = `/uploads/${hotel.slug}-${image.filename}${fileExtension}`;
                // Move the uploaded file to the correct location
                yield fs_1.default.promises.rename(image.path, `uploads/${hotel.slug}-${image.filename}${fileExtension}`);
                return imageUrl;
            })));
            hotel.images = imageUrls;
            yield this.saveHotels(hotels);
            return imageUrls;
        });
    }
}
exports.HotelService = HotelService;
HotelService.hotelDataPath = 'data/hotels.json';
