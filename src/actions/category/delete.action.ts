import { ObjectId } from 'mongodb'
import { CategoryRepository } from '../../repositories/category.repository'
import cache from '../../utils/redis.util'

class DeleteCategoryAction {
  private id: ObjectId
  private categoryRepository: CategoryRepository

  constructor (id: string) {
    this.categoryRepository = new CategoryRepository()
    this.id = new ObjectId(id)
  }

  public run = async (): Promise<void> => {
    await this.categoryRepository.deleteOne(this.id)
    await cache.del('Categories')
  }
}

export { DeleteCategoryAction }
