import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { ResponseHandler } from '../../utils/response.util';
import { CatchError } from '../../utils/catch.error.util';
import { HealthCheckAction } from '../../actions/health/check.action';
import { logger } from '../../utils/logger.util';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    await cache.connect()
    const data = await (new HealthCheckAction()).run();

    return ResponseHandler.success(data)
  } catch (error) {
    logger.error('Serveless::Category::Health', { error });
    return CatchError.response(error)
  }
};
