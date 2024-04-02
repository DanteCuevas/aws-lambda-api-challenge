import { ObjectId } from 'mongodb'
import { Category, ICategoryDtoUpdate } from '../../interfaces/category.interface'
import { CategoryRepository } from '../../repositories/category.repository'
import cache from '../../utils/redis.util'

class UpdateCategoryAction {
  private data: ICategoryDtoUpdate
  private id: ObjectId
  private categoryRepository: CategoryRepository

  constructor (id: string, data: ICategoryDtoUpdate) {
    this.categoryRepository = new CategoryRepository()
    this.id = new ObjectId(id)
    this.data = data
  }

  public run = async (): Promise<Category> => {
    await this.categoryRepository.updateOne(this.id, this.data)
    const categoryResult = await this.categoryRepository.findOne(this.id)
    await cache.del('Categories')

    return categoryResult as Category
  }
}

export { UpdateCategoryAction }
