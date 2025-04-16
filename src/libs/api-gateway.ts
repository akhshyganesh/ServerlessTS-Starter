import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const formatJSONResponse = (
  statusCode: number = 200,
  response: Record<string, unknown>
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

export const parseEvent = (event: APIGatewayProxyEvent) => {
  const queryParams = event.queryStringParameters || {};
  const body = event.body ? JSON.parse(event.body) : {};
  
  return {
    queryParams,
    body,
    pathParams: event.pathParameters || {},
    requestContext: event.requestContext,
  };
};
