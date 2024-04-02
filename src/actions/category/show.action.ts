import { ObjectId } from 'mongodb'
import { Category } from '../../interfaces/category.interface'
import { CategoryRepository } from '../../repositories/category.repository'

class ShowCategoryAction {
  private id: ObjectId
  private categoryRepository: CategoryRepository

  constructor (id: string) {
    this.categoryRepository = new CategoryRepository()
    this.id = new ObjectId(id)
  }

  public run = async (): Promise<Category> => {
    const categoryResult = await this.categoryRepository.findOne(this.id)

    return categoryResult as Category
  }
}

export { ShowCategoryAction }
