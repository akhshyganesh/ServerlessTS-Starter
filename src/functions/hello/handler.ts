import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, parseEvent } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { helloService } from "./service";

/**
 * Example GET handler
 */
export const main = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { queryParams } = parseEvent(event);
    const result = await helloService.sayHello(queryParams.name);
    return formatJSONResponse(200, result);
  }
);

/**
 * Example POST handler
 */
export const post = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { body } = parseEvent(event);
    const result = await helloService.processData(body);
    return formatJSONResponse(200, result);
  }
);
