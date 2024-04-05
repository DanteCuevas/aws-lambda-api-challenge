import { IProductBodyCreate } from '../../interfaces/product.interface'
import { ObjectId } from 'mongodb'
import { CategoryRepository } from '../../repositories/category.repository'
import { MongoValidationError } from '../../utils/errors/mongodb'

class CreateProductExtraDBRequest {
  public static validate = async (body: IProductBodyCreate) => {
    await this.existsCategory(body.category_id)
  }

  private static existsCategory = async (id: string): Promise<void> => {
    const categoryRepository = new CategoryRepository()
    const category = await categoryRepository.findById(new ObjectId(id))
    if (!category) {
      throw new MongoValidationError('"category_id" not exist', 'category_id')
    }
  }
}

export { CreateProductExtraDBRequest }
