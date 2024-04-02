import * as redis from 'redis'
import { RedisClientType } from '@redis/client';
import 'dotenv/config'

class SingletonRedis {
  private _constructor () { /* Private constructor */ }
  private static instance: RedisClientType;
  public static getInstance (): RedisClientType {
    if (!SingletonRedis.instance) {
      SingletonRedis.instance = redis.createClient({
        url: process.env.REDIS_URL
      });
    }

    return SingletonRedis.instance;
  }
}

const cache = SingletonRedis.getInstance();

export default cache
