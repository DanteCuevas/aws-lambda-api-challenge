import { Product, IProductFilter, IProductPagination } from '../../interfaces/product.interface'
import { ProductRepository } from '../../repositories/product.repository'

class ListProductAction {
  private productRepository: ProductRepository

  constructor () {
    this.productRepository = new ProductRepository()
  }

  public run = async (productFilter: IProductFilter): Promise<IProductPagination> => {
    const pageNumber = productFilter?.page || 1;
    const pageSize = 10;
    const filter = productFilter?.filterName ? { name: { $regex: productFilter.filterName, $options: 'i' } } : {}
    const sort = productFilter?.orderBy || 'name';
    const direction = productFilter?.order || 'desc';

    const data = await this.productRepository
      .findWithPagination(filter, pageNumber, pageSize, sort, direction) as Product[]
    const total = await this.productRepository.count(filter)
    return { data, total, page: pageNumber, pageSize }
  }
}

export {
  ListProductAction
}
