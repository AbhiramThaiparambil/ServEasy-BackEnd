import { Schema, model, Document } from "mongoose";
import { ICategory } from "../../domain/entities/ICategory ";

interface ICategoryModel extends ICategory, Document {}

const ServiceTypeSchema = new Schema({
  serviceName: { type: String},
  serviceDescription: { type: String },
});

const CategorySchema = new Schema<ICategoryModel>(
  {
    category: { type: String },
    isHidden:{type:Boolean,default:false},
    typeService: { type: [ServiceTypeSchema] },
  },
  {
    timestamps: true,
  }
);

// Ensure the model is defined correctly
export const CategoryModel = model<ICategoryModel>("Category", CategorySchema);