"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ReviewRepository = void 0;
const ReviewModel_1 = require("../models/ReviewModel");
const tsyringe_1 = require("tsyringe");
let ReviewRepository = class ReviewRepository {
    create(review) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = new ReviewModel_1.ReviewModel(review);
            const savedReview = yield newReview.save();
            return savedReview.toObject();
        });
    }
    findByServiceId(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ReviewModel_1.ReviewModel.find({ serviceId }).lean();
        });
    }
    findByBookingId(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ReviewModel_1.ReviewModel.findOne({ bookingId }).lean();
        });
    }
    findReviews(serviceId) {
        return ReviewModel_1.ReviewModel.aggregate([
            {
                $match: { serviceId }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 1,
                    rating: 1,
                    comment: 1,
                    userProfile: "$userDetails.profileImage",
                    userName: "$userDetails.userName",
                }
            }
        ]);
    }
};
exports.ReviewRepository = ReviewRepository;
exports.ReviewRepository = ReviewRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ReviewRepository);
