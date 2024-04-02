import { BaseRepository } from './base.repository';
import { Product } from '../interfaces/product.interface';
import db from '../utils/mongo.util'
import { Document, Filter, SortDirection } from 'mongodb';

export class ProductRepository extends BaseRepository<Product> {
  constructor () {
    super()
    this.collection = db.getCollection('products')
  }

  public async findWithPagination (
    filter: Filter<Document>,
    pageNumber: number,
    pageSize: number,
    sort: string,
    direction: SortDirection
  ): Promise<Product[]> {
    const skip = (pageNumber - 1) * pageSize;
    return await this.collection?.find<Product>(filter)
      .skip(skip).limit(pageSize)
      .sort(sort, direction)
      .toArray() as Product[];
  }

  public async count (filter: Filter<Product>): Promise<number> {
    return await this.collection?.countDocuments(filter) as number;
  }
}
