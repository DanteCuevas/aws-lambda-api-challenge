import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { IProductQueryParams } from '../../interfaces/product.interface'
import db from '../../utils/mongo.util'
import { ResponseHandler } from '../../utils/response.util'
import { ShowProductAction } from '../../actions/product/show.action'
import { ShowProductRequest } from '../../requests/product/show.request'
import { CatchError } from '../../utils/catch.error.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const { id } = event.pathParameters as IProductQueryParams
    await ShowProductRequest.validate({ id })
    const product = await (new ShowProductAction(id)).run()

    return ResponseHandler.success({ product })
  } catch (error) {
    return CatchError.response(error)
  }
};
