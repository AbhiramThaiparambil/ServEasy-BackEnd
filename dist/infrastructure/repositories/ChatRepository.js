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
exports.ChatRepository = void 0;
const tsyringe_1 = require("tsyringe");
const chatModel_1 = require("../models/chatModel");
const mongoose_1 = require("mongoose");
let ChatRepository = class ChatRepository {
    //   async saveMessage({ senderId, receiverId, content, messageType }: IMessage) {
    //     const newMessage = {
    //       content,
    //       messageType,
    //       delivered: true,
    //       seen: false,
    //       createdAt: new Date(),
    //     };
    //     const chat = await ChatModel.findOneAndUpdate(
    //       {
    //         $or: [
    //           { user1: senderId, user2: receiverId },
    //           { user1: receiverId, user2: senderId }
    //         ]
    //       },
    //       {
    //         $push: { messages: newMessage },
    //         $set: { lastMessageAt: new Date() }
    //       },
    //       {
    //         new: true,
    //         upsert: true,
    //         setDefaultsOnInsert: true
    //       }
    //     );
    //     return chat;
    //   }
    findByIds(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user1, user2] = [senderId, receiverId].sort((a, b) => a.toString().localeCompare(b.toString()));
            return yield chatModel_1.ChatModel.findOne({
                participants: [user1, user2],
            });
        });
    }
    createChat(userA, userB, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user1, user2] = [userA, userB].sort((a, b) => a.toString().localeCompare(b.toString()));
            const newChat = new chatModel_1.ChatModel({
                participants: [user1, user2],
                messages,
                lastMessageAt: new Date(),
            });
            return yield newChat.save();
        });
    }
    addMessage(chatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chatModel_1.ChatModel.findByIdAndUpdate(chatId, {
                $push: { messages: Object.assign(Object.assign({}, message), { timestamp: new Date() }) },
                $set: { lastMessageAt: new Date() },
            }, { new: true });
        });
    }
    //   async makeItOnline(id1: Types.ObjectId, onlineId: Types.ObjectId): Promise<void> {
    //     const chat = await this.findByIds(id1, onlineId);
    //     if (!chat) return;
    //     const onlineIdObj = new Types.ObjectId(onlineId);
    //     const id1Obj = new Types.ObjectId(id1);
    //     const [userA, userB] = chat.participants.map(p => new Types.ObjectId(p));
    //     const isOnlineA = userA.equals(onlineIdObj);
    //     const isOnlineB = userB.equals(onlineIdObj);
    //     // If presence array is empty, initialize it correctly
    //     if (!chat.presence || chat.presence.length === 0) {
    //       await ChatModel.updateOne(
    //         { _id: chat._id },
    //         {
    //           $set: {
    //             presence: [
    //               {
    //                 userId: userA,
    //                 online: isOnlineA,
    //                 lastSeen: isOnlineA ? null : new Date(),
    //               },
    //               {
    //                 userId: userB,
    //                 online: isOnlineB,
    //                 lastSeen: isOnlineB ? null : new Date(),
    //               },
    //             ],
    //           },
    //         }
    //       );
    //       return;
    //     }
    //     // Update presence for existing records
    //     await ChatModel.updateOne(
    //       { _id: chat._id },
    //       {
    //         $set: {
    //           "presence.$[online].online": true,
    //           "presence.$[online].lastSeen": null,
    //           "presence.$[offline].online": false,
    //           "presence.$[offline].lastSeen": new Date(),
    //         },
    //       },
    //       {
    //         arrayFilters: [
    //           { "online.userId": onlineIdObj },
    //           { "offline.userId": { $ne: onlineIdObj } },
    //         ],
    //       }
    //     );
    //   }
    makeItOnline(id1, onlineId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.findByIds(id1, onlineId);
            if (!chat)
                return;
            const onlineIdObj = new mongoose_1.Types.ObjectId(onlineId);
            const id1Obj = new mongoose_1.Types.ObjectId(id1);
            const [userA, userB] = chat.participants.map(p => new mongoose_1.Types.ObjectId(p));
            const participantsSet = new Set([userA.toHexString(), userB.toHexString()]);
            if (!participantsSet.has(onlineIdObj.toHexString()))
                return;
            if (!chat.presence || chat.presence.length === 0) {
                yield chatModel_1.ChatModel.updateOne({ _id: chat._id }, {
                    $set: {
                        presence: [
                            {
                                userId: userA,
                                online: userA.equals(onlineIdObj),
                                lastSeen: userA.equals(onlineIdObj) ? null : new Date(),
                            },
                            {
                                userId: userB,
                                online: userB.equals(onlineIdObj),
                                lastSeen: userB.equals(onlineIdObj) ? null : new Date(),
                            },
                        ],
                    },
                });
                return;
            }
            yield chatModel_1.ChatModel.updateOne({ _id: chat._id }, {
                $set: {
                    'presence.$[user].online': true,
                    'presence.$[user].lastSeen': null,
                },
            }, {
                arrayFilters: [{ 'user.userId': onlineIdObj }],
            });
        });
    }
    makeItOffline(sender, receiver, offlineId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.findByIds(sender, receiver);
            if (!chat)
                return;
            yield chatModel_1.ChatModel.updateOne({ _id: chat._id, 'presence.userId': offlineId }, {
                $set: {
                    'presence.$.online': false,
                    'presence.$.lastSeen': new Date(),
                },
            });
        });
    }
    findUsersChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.Types.ObjectId(userId);
            const chats = yield chatModel_1.ChatModel.aggregate([
                {
                    $match: {
                        participants: objectId,
                    },
                },
                {
                    $sort: { lastMessageAt: -1 },
                },
                {
                    $unwind: '$participants',
                },
                {
                    $match: {
                        participants: { $ne: objectId },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'participants',
                        foreignField: '_id',
                        pipeline: [
                            {
                                $project: {
                                    userName: 1,
                                    profileImage: 1,
                                },
                            },
                        ],
                        as: 'otherUser',
                    },
                },
                {
                    $unwind: '$otherUser',
                },
                {
                    $addFields: {
                        lastMessage: {
                            $arrayElemAt: ['$messages', -1],
                        },
                        filteredPresence: {
                            $filter: {
                                input: '$presence',
                                as: 'presence',
                                cond: { $ne: ['$$presence.userId', objectId] },
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        lastMessageAt: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        lastMessage: 1,
                        userName: '$otherUser.userName',
                        userID: '$otherUser._id',
                        userAvatar: '$otherUser.profileImage',
                        presence: '$filteredPresence',
                    },
                },
            ]);
            return chats;
        });
    }
    // async findServiceProvidersChat(userId:string) :Promise<IServiceProviderChat[]>{
    //   const objectId = new Types.ObjectId(userId);
    //   const chats = await ChatModel.aggregate([
    //     {
    //       $match: {
    //         participants: objectId
    //       }
    //     },
    //     {
    //       $sort: { lastMessageAt: -1 }
    //     },
    //     {
    //       $unwind: "$participants"
    //     },
    //     {
    //       $match: {
    //         participants: { $ne: objectId }
    //       }
    //     },
    //     {
    //       $lookup: {
    //         from: "users",
    //         localField: "participants",
    //         foreignField: "_id",
    //         as: "userDetails"
    //       }
    //     },
    //     {
    //       $unwind: "$userDetails"
    //     },
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "userDetails.serviceProvider",
    //         foreignField: "_id",
    //         as: "serviceProviderDetails"
    //       }
    //     },
    //     {
    //       $unwind: "$serviceProviderDetails"
    //     },
    //     {
    //       $addFields: {
    //         lastMessage: {
    //           $arrayElemAt: ["$messages", -1]
    //         },
    //         filteredPresence: {
    //           $filter: {
    //             input: "$presence",
    //             as: "presence",
    //             cond: { $ne: ["$$presence.userId", objectId] }
    //           }
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         lastMessageAt: 1,
    //         createdAt: 1,
    //         updatedAt: 1,
    //         lastMessage: 1,
    //         userName: "$serviceProviderDetails.serviceProviderName",
    //         userAvatar: "$serviceProviderDetails.profileImage",
    //         userId:"$serviceProviderDetails.userId",
    //         presence: "$filteredPresence"
    //       }
    //     }
    //   ]);
    //   return chats;
    //   }
    findServiceProvidersChat(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.Types.ObjectId(userId);
            const chats = yield chatModel_1.ChatModel.aggregate([
                {
                    $match: {
                        participants: objectId,
                    },
                },
                {
                    $sort: { lastMessageAt: -1 },
                },
                {
                    $unwind: '$participants',
                },
                {
                    $match: {
                        participants: { $ne: objectId },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'participants',
                        foreignField: '_id',
                        as: 'userDetails',
                    },
                },
                {
                    $unwind: '$userDetails',
                },
                {
                    $lookup: {
                        from: 'serviceproviders',
                        localField: 'userDetails.serviceProvider',
                        foreignField: '_id',
                        as: 'serviceProviderDetails',
                    },
                },
                {
                    $unwind: '$serviceProviderDetails',
                },
                {
                    $addFields: {
                        lastMessage: {
                            $arrayElemAt: ['$messages', -1],
                        },
                        currentUserPresence: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$presence',
                                        as: 'presence',
                                        cond: { $eq: ['$$presence.userId', objectId] },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $addFields: {
                        unread: {
                            $cond: [
                                { $eq: ['$lastMessage.sender', 'serviceProvider'] },
                                {
                                    $gt: ['$lastMessage.timestamp', '$currentUserPresence.lastSeen'],
                                },
                                false,
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        lastMessageAt: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        lastMessage: 1,
                        userName: '$serviceProviderDetails.serviceProviderName',
                        userAvatar: '$serviceProviderDetails.profileImage',
                        userId: '$serviceProviderDetails.userId',
                        presence: {
                            $filter: {
                                input: '$presence',
                                as: 'presence',
                                cond: { $ne: ['$$presence.userId', objectId] },
                            },
                        },
                        unread: 1,
                    },
                },
            ]);
            return chats;
        });
    }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ChatRepository);
