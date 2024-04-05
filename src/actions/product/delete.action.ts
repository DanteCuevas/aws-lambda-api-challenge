import { ObjectId } from 'mongodb'
import { ProductRepository } from '../../repositories/product.repository'

class DeleteProductAction {
  private id: ObjectId
  private productRepository: ProductRepository

  constructor (id: string) {
    this.productRepository = new ProductRepository()
    this.id = new ObjectId(id)
  }

  public run = async (): Promise<void> => {
    await this.productRepository.deleteById(this.id)
  }
}

export { DeleteProductAction }
