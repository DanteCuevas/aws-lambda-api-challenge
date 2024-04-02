import { Category } from '../../interfaces/category.interface'
import { CategoryRepository } from '../../repositories/category.repository'
import cache from '../../utils/redis.util'

class ListCategoryAction {
  private categoryRepository: CategoryRepository

  constructor () {
    this.categoryRepository = new CategoryRepository()
  }

  public run = async (): Promise<Category[]> => {
    return this.cacheCategories()
  }

  private cacheCategories = async (): Promise<Category[]> => {
    const cacheCategories = await cache.get('Categories')
    if (cacheCategories) {
      const data: Category[] = JSON.parse(cacheCategories);
      return data
    }
    const categories = await this.categoryRepository.find() as Category[]
    await cache.setEx('Categories', this.expireCache(), JSON.stringify(categories))
    return categories
  }

  private expireCache = (): number => {
    return 60 * 15
  }
}

export {
  ListCategoryAction
}
