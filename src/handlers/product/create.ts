import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { IProductBodyCreate } from '../../interfaces/product.interface'
import db from '../../utils/mongo.util'
import { ProductDto } from '../../dtos/product.dto'
import { ResponseHandler } from '../../utils/response.util'
import { CreateProductAction } from '../../actions/product/create.action'
import { CreateProductRequest } from '../../requests/product/create.request'
import { CatchError } from '../../utils/catch.error.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'
import { logger } from '../../utils/logger.util';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const body: IProductBodyCreate = JSON.parse(event.body as string)
    await CreateProductRequest.validate(body)
    const data = await ProductDto.create(body)
    const product = await (new CreateProductAction(data)).run();

    return ResponseHandler.created({ product })
  } catch (error) {
    logger.error('Serveless::Product::Create', { error });
    return CatchError.response(error)
  }
};
