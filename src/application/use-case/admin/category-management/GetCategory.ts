import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../../../domain/entities/ICategory ";

@injectable()
export class GetCategory {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<void|ICategory[]> {
   
    try {
return this.categoryRepository.getAllCategories()
    } catch (error) {
        console.log(error);
        
    }
  }

  async getActiveCategory(){
            return await this.categoryRepository.getActiveCategories();

  }
}
