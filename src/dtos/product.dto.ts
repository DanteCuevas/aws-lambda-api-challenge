import { ObjectId } from 'mongodb'
import { IProductBodyCreate, IProductBodyUpdate, IProductDtoCreate, IProductDtoUpdate } from '../interfaces/product.interface'
import { Category, ICategoryShort } from '../interfaces/category.interface'
import { CategoryRepository } from '../repositories/category.repository'

class ProductDto {
  public static create = async (body: IProductBodyCreate): Promise<IProductDtoCreate> => {
    const category = await this.getCategory(body.category_id)
    return {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      category,
      created_at: new Date()
    }
  }

  public static update = async (body: IProductBodyUpdate): Promise<IProductDtoUpdate> => {
    const category = await this.getCategory(body.category_id)
    return {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      category,
      updated_at: new Date()
    }
  }

  private static getCategory = async (id: string): Promise<ICategoryShort> => {
    const categoryRepository = new CategoryRepository()
    const category = await categoryRepository.findById(new ObjectId(id)) as Category;
    return {
      _id: category._id,
      name: category.name
    }
  }
}

export { ProductDto }
