import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import db from '../../utils/mongo.util'
import { ResponseHandler } from '../../utils/response.util'
import { IProductFilter } from '../../interfaces/product.interface'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'
import { FilterProductRequest } from '../../requests/product/filter.request'
import { ListProductAction } from '../../actions/product/list.action'
import { CatchError } from '../../utils/catch.error.util'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const params = event.queryStringParameters as IProductFilter;
    await FilterProductRequest.validate(params)
    const data = await (new ListProductAction()).run(params)

    return ResponseHandler.success(data)
  } catch (error) {
    return CatchError.response(error)
  }
};
