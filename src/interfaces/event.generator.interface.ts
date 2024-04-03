import { APIGatewayProxyEvent, APIGatewayProxyEventHeaders, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters, APIGatewayProxyEventStageVariables } from 'aws-lambda'

export type APIGatewayProxyEventPart2 = Pick<
  APIGatewayProxyEvent,
  'body' | 'headers' | 'httpMethod' | 'path' | 'queryStringParameters' | 'pathParameters' | 'stageVariables'
>

export type APIGatewayProxyEventPart = {
  body?: string | null
  headers?: APIGatewayProxyEventHeaders | null
  httpMethod?: string | null
  path?: string | null
  queryStringParameters?: APIGatewayProxyEventQueryStringParameters | null
  pathParameters?: APIGatewayProxyEventPathParameters | null
  stageVariables?: APIGatewayProxyEventStageVariables | null
}
