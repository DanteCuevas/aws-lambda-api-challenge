import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import db from '../../utils/mongo.util'
import cache from '../../utils/redis.util'
import { ResponseHandler } from '../../utils/response.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'
import { ListCategoryAction } from '../../actions/category/list.action'
import { CatchError } from '../../utils/catch.error.util'

(async () => {
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const categories = await (new ListCategoryAction()).run()

    return ResponseHandler.success({ categories })
  } catch (error) {
    return CatchError.response(error)
  }
};
