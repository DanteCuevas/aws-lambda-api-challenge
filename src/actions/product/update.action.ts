import { ObjectId } from 'mongodb'
import { Product, IProductDtoUpdate } from '../../interfaces/product.interface'
import { ProductRepository } from '../../repositories/product.repository'

class UpdateProductAction {
  private data: IProductDtoUpdate
  private id: ObjectId
  private productRepository: ProductRepository

  constructor (id: string, data: IProductDtoUpdate) {
    this.productRepository = new ProductRepository()
    this.id = new ObjectId(id)
    this.data = data
  }

  public run = async (): Promise<Product> => {
    await this.productRepository.updateById(this.id, this.data)
    const categoryResult = await this.productRepository.findById(this.id)
    return categoryResult as Product
  }
}

export { UpdateProductAction }
