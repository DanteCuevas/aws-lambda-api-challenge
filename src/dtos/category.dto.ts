import {
  ICategoryBodyCreate,
  ICategoryBodyUpdate,
  ICategoryDtoCreate,
  ICategoryDtoUpdate
} from '../interfaces/category.interface'

class CategoryDto {
  public static create = (body: ICategoryBodyCreate): ICategoryDtoCreate => {
    return {
      name: body.name,
      description: body.description,
      created_at: new Date()
    }
  }

  public static update = (body: ICategoryBodyUpdate): ICategoryDtoUpdate => {
    return {
      name: body.name,
      description: body.description,
      updated_at: new Date()
    }
  }
}

export { CategoryDto }
