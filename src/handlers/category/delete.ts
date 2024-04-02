import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICategoryQueryParams } from '../../interfaces/category.interface'
import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { ResponseHandler } from '../../utils/response.util'
import { DeleteCategoryAction } from '../../actions/category/delete.action'
import { DeleteCategoryRequest } from '../../requests/category/delete.request'
import { CatchError } from '../../utils/catch.error.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'

(async () => {
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const { id } = event.pathParameters as ICategoryQueryParams
    await DeleteCategoryRequest.validate({ id })
    await (new DeleteCategoryAction(id)).run()

    return ResponseHandler.noContent({})
  } catch (error) {
    return CatchError.response(error)
  }
};
