import { IProductQueryParams } from '../../interfaces/product.interface'
import { ObjectId } from 'mongodb'
import { ProductRepository } from '../../repositories/product.repository'
import { MongoValidationError } from '../../utils/errors/mongodb'

class ShowProductExtraDBRequest {
  public static validate = async (body: IProductQueryParams) => {
    await this.existsProduct(body.id)
  }

  private static existsProduct = async (id: string): Promise<void> => {
    const productRepository = new ProductRepository()
    const product = await productRepository.findOne(new ObjectId(id))
    if (!product) {
      throw new MongoValidationError('Product not exist', 'id')
    }
  }
}

export { ShowProductExtraDBRequest }
