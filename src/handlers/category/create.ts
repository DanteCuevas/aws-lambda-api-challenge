import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICategoryBodyCreate } from '../../interfaces/category.interface'
import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { CategoryDto } from '../../dtos/category.dto'
import { ResponseHandler } from '../../utils/response.util'
import { CreateCategoryAction } from '../../actions/category/create.action'
import { CreateCategoryRequest } from '../../requests/category/create.request'
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
    const body: ICategoryBodyCreate = JSON.parse(event.body as string)
    await CreateCategoryRequest.validate(body)
    const data = CategoryDto.create(body)
    const category = await (new CreateCategoryAction(data)).run()

    return ResponseHandler.created({ category })
  } catch (error) {
    logger.error('Serveless::Category::Create', { error });
    return CatchError.response(error)
  }
};
