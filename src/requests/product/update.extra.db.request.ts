import { IProductBodyUpdate } from '../../interfaces/product.interface'
import { ObjectId } from 'mongodb'
import { ProductRepository } from '../../repositories/product.repository'
import { CategoryRepository } from '../../repositories/category.repository'
import { MongoValidationError } from '../../utils/errors/mongodb'

class UpdateProductExtraDBRequest {
  public static validate = async (body: IProductBodyUpdate) => {
    await this.existsProduct(body.id)
    await this.existsCategory(body.category_id)
  }

  private static existsProduct = async (id: string): Promise<void> => {
    const productRepository = new ProductRepository()
    const product = await productRepository.findOne(new ObjectId(id))
    if (!product) {
      throw new MongoValidationError('Product not exist', 'id')
    }
  }

  private static existsCategory = async (id: string): Promise<void> => {
    const categoryRepository = new CategoryRepository()
    const category = await categoryRepository.findOne(new ObjectId(id))
    if (!category) {
      throw new MongoValidationError('"category_id" not exist', 'category_id')
    }
  }
}

export { UpdateProductExtraDBRequest }
