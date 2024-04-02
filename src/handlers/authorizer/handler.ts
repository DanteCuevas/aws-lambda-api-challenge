import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';

export async function customAuthorizer (event: APIGatewayAuthorizerEvent): Promise<APIGatewayAuthorizerResult> {
  // @ts-ignore
  const apiKey = event.headers['x-api-key'];

  if (apiKey === 'your-api-key') {
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn
        }]
      }
    };
  } else {
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Deny',
          Resource: event.methodArn,
          Action: 'execute-api:Invoke'
        }]
      }
    };
  }
}
