import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { IProductBodyUpdate, IProductQueryParams } from '../../interfaces/product.interface'
import db from '../../utils/mongo.util'
import { ProductDto } from '../../dtos/product.dto'
import { ResponseHandler } from '../../utils/response.util'
import { UpdateProductAction } from '../../actions/product/update.action'
import { UpdateProductRequest } from '../../requests/product/update.request'
import { CatchError } from '../../utils/catch.error.util'
import { ValidateAuthorizeAction } from '../../actions/authorize/validate.action'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await db.connect();
    (new ValidateAuthorizeAction(event.headers.authorization)).run()
    const body: IProductBodyUpdate = JSON.parse(event.body as string)
    const { id } = event.pathParameters as IProductQueryParams
    await UpdateProductRequest.validate({ ...body, id })
    const data = await ProductDto.update(body)
    const product = await (new UpdateProductAction(id, data)).run()

    return ResponseHandler.success({ product })
  } catch (error) {
    return CatchError.response(error)
  }
};
