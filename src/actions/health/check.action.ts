import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { HealthDB, IHealthResponse } from '../../interfaces/health.interface'

class HealthCheckAction {
  public run = async (): Promise<IHealthResponse> => {
    const database = await this.databaseCheck();
    const redis = await this.redisCheck();
    let status = 'healthy'
    let message = 'API is running smoothly'
    const lastChecked = new Date()
    if (database.status === 'disconnected' && redis.status === 'disconnected') {
      status = 'healthy'
      message = 'API is not running smoothly'
    }
    return {
      status,
      message,
      lastChecked,
      database,
      redis
    }
  }

  private databaseCheck = async (): Promise<HealthDB> => {
    const database = await db.check()
      ? {
          status: 'connected',
          message: 'Connected to MongoDB'
        }
      : {
          status: 'disconnected',
          message: 'Disconnected to MongoDB'
        }
    return { ...database, lastChecked: new Date() }
  }

  private redisCheck = async (): Promise<HealthDB> => {
    const redis = await cache.ping()
      ? {
          status: 'connected',
          message: 'Connected to Redis'
        }
      : {
          status: 'disconnected',
          message: 'Disconnected to Redis'
        }
    return { ...redis, lastChecked: new Date() }
  }
}

export { HealthCheckAction }
