import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICategoryBodyUpdate, ICategoryQueryParams } from '../../interfaces/category.interface'
import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { CategoryDto } from '../../dtos/category.dto'
import { ResponseHandler } from '../../utils/response.util'
import { UpdateCategoryAction } from '../../actions/category/update.action'
import { UpdateCategoryRequest } from '../../requests/category/update.request'
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
    const body: ICategoryBodyUpdate = JSON.parse(event.body as string)
    const { id } = event.pathParameters as ICategoryQueryParams
    await UpdateCategoryRequest.validate({ ...body, id })
    const data = CategoryDto.update(body)
    const category = await (new UpdateCategoryAction(id, data)).run()

    return ResponseHandler.success({ category })
  } catch (error) {
    logger.error('Serveless::Category::Update', { error });
    return CatchError.response(error)
  }
};
