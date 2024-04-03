import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { IProductQueryParams } from '../../interfaces/product.interface'
import db from '../../utils/mongo.util'
import { ResponseHandler } from '../../utils/response.util'
import { DeleteProductAction } from '../../actions/product/delete.action'
import { DeleteProductRequest } from '../../requests/product/delete.request'
import { CatchError } from '../../utils/catch.error.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'
import { logger } from '../../utils/logger.util';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const { id } = event.pathParameters as IProductQueryParams
    await DeleteProductRequest.validate({ id })
    await (new DeleteProductAction(id)).run()

    return ResponseHandler.noContent({})
  } catch (error) {
    logger.error('Serveless::Product::Delete', { error });
    return CatchError.response(error)
  }
};
