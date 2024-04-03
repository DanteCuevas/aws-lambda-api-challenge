import { ICategoryQueryParams } from '../../interfaces/category.interface'
import { ObjectId } from 'mongodb'
import { CategoryRepository } from '../../repositories/category.repository'
import { MongoValidationError } from '../../utils/errors/mongodb'

class DeleteCategoryExtraDBRequest {
  public static validate = async (body: ICategoryQueryParams) => {
    await this.existsCategory(body.id)
  }

  private static existsCategory = async (id: string): Promise<void> => {
    const categoryRepository = new CategoryRepository()
    const category = await categoryRepository.findOne(new ObjectId(id))
    if (!category) {
      throw new MongoValidationError('"Category" not exist', 'id')
    }
  }
}

export { DeleteCategoryExtraDBRequest }
