import { injectable } from 'tsyringe';
import { ChatModel } from '../models/chatModel';
import { IChatRepository } from '../../domain/repositories/IChatRepository';
import { IChat, IMessage, IServiceProviderChat, IUserChat } from '../../domain/entities/IChat';
import { Types } from 'mongoose';
@injectable()
export class ChatRepository implements IChatRepository {
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
  async findByIds(senderId: string, receiverId: string): Promise<IChat | null> {
    const [user1, user2] = [senderId, receiverId].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );

    return await ChatModel.findOne({
      participants: [user1, user2],
    });
  }

  async createChat(
    userA: string,
    userB: string,
    messages: Array<IMessage>
  ): Promise<IChat> {
    const [user1, user2] = [userA, userB].sort((a, b) => a.toString().localeCompare(b.toString()));

    const newChat = new ChatModel({
      participants: [user1, user2],
      messages,
      lastMessageAt: new Date(),
    });

    return await newChat.save();
  }

  async addMessage(
    chatId: string,
    message: {
      messageType: string;
      content: string;
      sender: 'user' | 'serviceProvider';
    }
  ) {
    return await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: { ...message, timestamp: new Date() } },
        $set: { lastMessageAt: new Date() },
      },
      { new: true }
    );
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

  async makeItOnline(id1: string, onlineId: string): Promise<void> {
    const chat = await this.findByIds(id1, onlineId);
    if (!chat) return;

    const onlineIdObj = new Types.ObjectId(onlineId);
    const id1Obj = new Types.ObjectId(id1);

    const [userA, userB] = chat.participants.map(p => new Types.ObjectId(p));

    const participantsSet = new Set([userA.toHexString(), userB.toHexString()]);
    if (!participantsSet.has(onlineIdObj.toHexString())) return;

    if (!chat.presence || chat.presence.length === 0) {
      await ChatModel.updateOne(
        { _id: chat._id },
        {
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
        }
      );
      return;
    }

    await ChatModel.updateOne(
      { _id: chat._id },
      {
        $set: {
          'presence.$[user].online': true,
          'presence.$[user].lastSeen': null,
        },
      },
      {
        arrayFilters: [{ 'user.userId': onlineIdObj }],
      }
    );
  }

  async makeItOffline(
    sender: string,
    receiver: string,
    offlineId: string
  ): Promise<void> {
    const chat = await this.findByIds(sender, receiver);
    if (!chat) return;

    await ChatModel.updateOne(
      { _id: chat._id, 'presence.userId': offlineId },
      {
        $set: {
          'presence.$.online': false,
          'presence.$.lastSeen': new Date(),
        },
      }
    );
  }

  async findUsersChats(userId: string): Promise<IUserChat[]> {
    const objectId = new Types.ObjectId(userId);
    const chats = await ChatModel.aggregate([
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

  async findServiceProvidersChat(userId: string): Promise<IServiceProviderChat[]> {
    const objectId = new Types.ObjectId(userId);

    const chats = await ChatModel.aggregate([
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
  }
}
