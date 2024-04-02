import { Category, ICategoryDtoCreate } from '../../interfaces/category.interface'
import { CategoryRepository } from '../../repositories/category.repository'
import cache from '../../utils/redis.util'

class CreateCategoryAction {
  private data: ICategoryDtoCreate
  private categoryRepository: CategoryRepository

  constructor (data: ICategoryDtoCreate) {
    this.categoryRepository = new CategoryRepository()
    this.data = data
  }

  public run = async (): Promise<Category> => {
    const category = await this.categoryRepository.insertOne(this.data)
    const categoryResult = await this.categoryRepository.findOne(category.insertedId)
    await cache.del('Categories')

    return categoryResult as Category
  }
}

export { CreateCategoryAction }
