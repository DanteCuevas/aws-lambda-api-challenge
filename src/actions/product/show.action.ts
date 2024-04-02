import { ObjectId } from 'mongodb'
import { Product } from '../../interfaces/product.interface'
import { ProductRepository } from '../../repositories/product.repository'

class ShowProductAction {
  private id: ObjectId
  private productRepository: ProductRepository

  constructor (id: string) {
    this.productRepository = new ProductRepository()
    this.id = new ObjectId(id)
  }

  public run = async (): Promise<Product> => {
    const productResult = await this.productRepository.findOne(this.id)

    return productResult as Product
  }
}

export { ShowProductAction }
