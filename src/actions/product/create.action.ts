import { Product, IProductDtoCreate } from '../../interfaces/product.interface'
import { ProductRepository } from '../../repositories/product.repository'

class CreateProductAction {
  private data: IProductDtoCreate
  private productRepository: ProductRepository

  constructor (data: IProductDtoCreate) {
    this.productRepository = new ProductRepository()
    this.data = data
  }

  public run = async (): Promise<Product> => {
    const product = await this.productRepository.insertOne(this.data)
    const productResult = await this.productRepository.findOne(product.insertedId)

    return productResult as Product
  }
}

export { CreateProductAction }
