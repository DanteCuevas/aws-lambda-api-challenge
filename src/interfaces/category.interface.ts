import { ObjectId } from 'mongodb'

export interface Category {
  _id: ObjectId
  name: string
  description?: string
  created_at: Date
  updated_at: Date | null
}

export type ICategoryShort = Pick<
  Category,
  '_id' | 'name'
>

export type ICategoryBodyCreate = Pick<
  Category,
  'name' | 'description'
>

export type ICategoryDtoCreate = Omit<
  Category,
  '_id' | 'updated_at'
>

export type ICategoryQueryParams = {
  id: string
}

export type ICategoryBodyUpdate = ICategoryBodyCreate & ICategoryQueryParams

export type ICategoryDtoUpdate = Omit<
  Category,
  '_id' | 'created_at'
>

export type ICategoryResponse = Pick<
  Category,
  '_id' | 'name' | 'description'
>
