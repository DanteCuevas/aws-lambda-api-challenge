import { IProductQueryParams } from '../../interfaces/product.interface'
import { ObjectId } from 'mongodb'
import { ProductRepository } from '../../repositories/product.repository'
import { MongoValidationError } from '../../utils/errors/mongodb'

class DeleteProductExtraDBRequest {
  public static validate = async (body: IProductQueryParams) => {
    await this.existsProduct(body.id)
  }

  private static existsProduct = async (id: string): Promise<void> => {
    const productRepository = new ProductRepository()
    const product = await productRepository.findById(new ObjectId(id))
    if (!product) {
      throw new MongoValidationError('Product not exist', 'id')
    }
  }
}

export { DeleteProductExtraDBRequest }
