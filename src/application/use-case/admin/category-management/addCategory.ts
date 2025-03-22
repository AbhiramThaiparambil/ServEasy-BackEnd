import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../../../domain/entities/ICategory ";

@injectable()
export class AddCategory {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository
  ) {}

  async execute(category:object): Promise<ICategory|void> {
   console.log(category);
   
    try {
        return await this.categoryRepository.addCategory(category);

    } catch (error) {
        console.log(error);
        
    }
  }
}
