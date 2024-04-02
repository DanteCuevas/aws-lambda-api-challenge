import { MongoClient, Db, Collection, Document } from 'mongodb';
import 'dotenv/config'

class Database {
  // eslint-disable-next-line no-use-before-define
  private static instance?: Database;
  private client?: MongoClient;
  private db?: Db;

  private _constructor () {
    // Private constructor to prevent external instantiation
  }

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect (): Promise<void> {
    if (!this.client) {
      this.client = await MongoClient.connect(process.env.DATABASE_URL as string);
      this.db = this.client.db();
    }
  }

  public async check (): Promise<Document | null> {
    if (!this.db) {
      return null;
    }
    return await this.db.command({ ping: 1 });
  }

  public getCollection (collection: string): Collection {
    if (!this.db) {
      throw new Error('MongoDB connection not established');
    }
    return this.db.collection(collection)
  }

  public getClient (): MongoClient {
    if (!this.client) {
      throw new Error('MongoDB client is not connected.');
    }
    return this.client;
  }

  public getDb (): Db {
    if (!this.db) {
      throw new Error('MongoDB database is not connected.');
    }
    return this.db;
  }

  public async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
      this.db = undefined;
    }
  }
}

export default Database.getInstance();
