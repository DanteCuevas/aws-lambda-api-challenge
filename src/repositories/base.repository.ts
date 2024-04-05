import { Collection, Filter, InsertOneResult, WithId, Document, ObjectId } from 'mongodb';

export class BaseRepository<T> {
  protected collection?: Collection;

  public async find (): Promise<WithId<Document>[] | undefined> {
    const find = await this.collection?.find().toArray();
    return find
  }

  public async findById (id: ObjectId): Promise<WithId<T> | null> {
    const query: Filter<Document> = {
      _id: id
    }
    const find = await this.collection?.findOne(query);
    return find as unknown as Promise<WithId<T> | null>
  }

  public async insertOne (document: Document): Promise<InsertOneResult> {
    const insert = await this.collection?.insertOne(document);
    return insert as unknown as Promise<InsertOneResult>
  }

  public async updateById (id: ObjectId, update: Partial<T>): Promise<void> {
    const query: Filter<Document> = {
      _id: id
    }
    await this.collection?.updateOne(query, { $set: update });
  }

  public async deleteById (id: ObjectId): Promise<void> {
    const query: Filter<Document> = {
      _id: id
    }
    await this.collection?.deleteOne(query);
  }
}
