import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, parseEvent } from "./api-gateway";
import { middyfy } from "./lambda";

type ServiceFunction<T = any, R = any> = (data: T) => Promise<R>;

/**
 * Creates a GET handler that extracts query parameters and passes them to a service function
 */
export const createGetHandler = (serviceFunction: ServiceFunction) => {
  return middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { queryParams } = parseEvent(event);
    const result = await serviceFunction(queryParams);
    return formatJSONResponse(200, result);
  });
};

/**
 * Creates a POST handler that extracts the request body and passes it to a service function
 */
export const createPostHandler = (serviceFunction: ServiceFunction) => {
  return middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { body } = parseEvent(event);
    const result = await serviceFunction(body);
    return formatJSONResponse(200, result);
  });
};
