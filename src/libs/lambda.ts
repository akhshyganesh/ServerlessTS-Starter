import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import httpCors from "@middy/http-cors";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const middyfy = (
  handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
) => {
  return middy(handler)
    .use(httpJsonBodyParser())
    .use(httpErrorHandler())
    .use(httpCors());
};
