import { BaseRepository } from './base.repository';
import { Category } from '../interfaces/category.interface';
import db from '../utils/mongo.util'

export class CategoryRepository extends BaseRepository<Category> {
  constructor () {
    super()
    this.collection = db.getCollection('categories')
  }
}
