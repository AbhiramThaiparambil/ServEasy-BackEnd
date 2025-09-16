import { Types } from 'mongoose';
import { injectable } from 'tsyringe';
import { IAiAssistanceRepository } from '../../domain/repositories/IAiAssistanceRepository';
import {
  IAiAssistanceChatInfo,
  IAiAssistanceChatSession,
  IAiAssistanceMessage,
} from '../../domain/entities/IAiAssistance';
import { AiAssistanceChatSessionModel } from '../models/aiAssistanceSessionModel';

@injectable()
export class aiAssistanceRepository implements IAiAssistanceRepository {
  async createSession(
    serviceProviderId: Types.ObjectId,
    message: IAiAssistanceMessage
  ): Promise<IAiAssistanceChatSession> {
    const newSession = new AiAssistanceChatSessionModel({
      serviceProviderId,
      title: message.content,
      messages: [message],
    });
   return await newSession.save();
   
  }

  async addMessage(
    serviceProviderId: Types.ObjectId,
    message: IAiAssistanceMessage,
    chatId?: string
  ): Promise<IAiAssistanceChatSession | null> {

    console.log(chatId);

    if (chatId) {
      
      
      const session = await AiAssistanceChatSessionModel.findById(new Types.ObjectId(chatId));
      if (!session) {
          return  await this.createSession(serviceProviderId, message);
    }
    } else {
       return await this.createSession(serviceProviderId, message);
    }

    return await AiAssistanceChatSessionModel.findOneAndUpdate(
      { _id: chatId },
       { $push: { messages: message } } 
    );
  }

  findById(chatId: Types.ObjectId): Promise<IAiAssistanceChatSession | null> {
    return AiAssistanceChatSessionModel.findById(chatId);
  }

  // findByServiceProvider(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatSession[]> {

  // return await AiAssistanceChatSessionModel.aggregate([{$match:{serviceProviderId},{$lookup:{from:"serviceProvider",localField:"serviceProviderId",foreignField:"_id",as:"chats"}}}])

  // }

  //   createSession(session: Partial<IAiAssistanceChatSession>): Promise<IAiAssistanceChatSession>;
  //   findById(chatId: Types.ObjectId): Promise<IAiAssistanceChatSession | null>;
  //   findByUser(userId: Types.ObjectId): Promise<IAiAssistanceChatSession[]>;
  //   addMessage(
  //     chatId: Types.ObjectId,
  //     message: IAiAssistanceChatSession["messages"][0]
  //   ): Promise<IAiAssistanceChatSession | null>;
  //   endSession(chatId: Types.ObjectId): Promise<boolean>;


async findByProviderId(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatSession[] | []> {
    
    return await AiAssistanceChatSessionModel.find({serviceProviderId}).sort({createdAt:-1})

}

async getChatsInfoByServiceProviderId(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatInfo[] | []> {
      return await AiAssistanceChatSessionModel.aggregate([{$match:{serviceProviderId}},{$sort:{createdAt:-1}},{ $project: {  title: 1, _id: 1 } }])


}

}
