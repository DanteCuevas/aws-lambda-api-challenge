import { APIGatewayProxyResult } from 'aws-lambda';

const buildResponse = (statusCode: number, data: object): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(data)
  };
}

const errorCustom = (data: object): object => {
  return { errors: data }
}

class ResponseHandler {
  public static success = (data: object): APIGatewayProxyResult => {
    return buildResponse(200, data);
  }

  public static created = (data: object): APIGatewayProxyResult => {
    return buildResponse(201, data);
  }

  public static noContent = (data: object): APIGatewayProxyResult => {
    return buildResponse(204, data);
  }

  public static badRequest = (data: object): APIGatewayProxyResult => {
    return buildResponse(400, data);
  }

  public static unauthorized = (data: object): APIGatewayProxyResult => {
    return buildResponse(401, data);
  }

  public static notFound = (data: object): APIGatewayProxyResult => {
    return buildResponse(404, data);
  }

  public static unprocessableEntity = (data: object): APIGatewayProxyResult => {
    return buildResponse(422, errorCustom(data));
  }

  public static fail = (data: object = { message: 'Server error, try again' }): APIGatewayProxyResult => {
    return buildResponse(500, data);
  }
}

export {
  ResponseHandler
}
