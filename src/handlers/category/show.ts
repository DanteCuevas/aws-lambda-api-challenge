import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICategoryQueryParams } from '../../interfaces/category.interface'
import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { ResponseHandler } from '../../utils/response.util'
import { ShowCategoryAction } from '../../actions/category/show.action'
import { ShowCategoryRequest } from '../../requests/category/show.request'
import { CatchError } from '../../utils/catch.error.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'
import { logger } from '../../utils/logger.util';

(async () => {
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const { id } = event.pathParameters as ICategoryQueryParams
    await ShowCategoryRequest.validate({ id })
    const category = await (new ShowCategoryAction(id)).run()

    return ResponseHandler.success({ category })
  } catch (error) {
    logger.error('Serveless::Category::Show', { error });
    return CatchError.response(error)
  }
};
