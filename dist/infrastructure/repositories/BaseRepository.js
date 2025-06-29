"use strict";
// import { Model } from "mongoose";
// import { IBaseRepository } from "../../domain/repositories/IBaseRepository"; 
// export class BaseRepository<T> implements IBaseRepository<T> {
//   protected model: Model<T>;
//   constructor(model: Model<T>) {
//     this.model = model;
//   }
//   async findById(id: string): Promise<T | null> {
//     return this.model.findById(id).lean<T>().exec();
//   }
//   async findAll(): Promise<T[]> {
//     return this.model.find().lean<T[]>().exec();
//   }
// //   async create(data: T): Promise<T> {
// //     const doc = new this.model(data);
// //     return doc.save();
// //   }
//   async update(id: string, data: Partial<T>): Promise<T | null> {
//     return this.model.findByIdAndUpdate(id, data, { new: true }).lean<T>().exec();
//   }
//   async delete(id: string): Promise<boolean> {
//     const result = await this.model.findByIdAndDelete(id).exec();
//     return result !== null;
//   }
// }
