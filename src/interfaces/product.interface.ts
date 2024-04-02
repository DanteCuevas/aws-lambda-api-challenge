import { ObjectId } from 'mongodb'
import { ICategoryShort } from './category.interface'

export interface Product {
  _id: ObjectId
  name: string
  description?: string
  price: number
  stock: number
  category: ICategoryShort
  created_at: Date
  updated_at?: Date
}

export interface IProductFilter {
  page?: number
  filterName?: string
  orderBy?: 'name' | 'stock'
  order?: 'asc' | 'desc'
}

export interface IProductPagination {
  data: Product[]
  total: number
  page: number
  pageSize: number
}

export type IProductBodyCreate = Pick<
  Product,
  'name' | 'price' | 'stock' | 'created_at' | 'description'
> & {
  category_id: string
}

export type IProductDtoCreate = Omit<
  Product,
  '_id' | 'updated_at'
>

export type IProductQueryParams = {
  id: string
}

export type IProductBodyUpdate = IProductBodyCreate & IProductQueryParams

export type IProductDtoUpdate = Omit<
  Product,
  '_id' | 'created_at'
>

export type IProductResponse = Pick<
  Product,
  '_id' | 'name' | 'description' | 'price' | 'stock' | 'category'
>
