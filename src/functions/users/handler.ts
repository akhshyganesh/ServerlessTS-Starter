import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, parseEvent } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { userService } from "./service";

/**
 * GET handler for retrieving users
 */
export const main = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { queryParams } = parseEvent(event);
    
    try {
      // Get optional filtering parameters from query string
      const { limit, offset, search } = queryParams;
      
      // Call the service function to get users
      const result = await userService.getUsers({
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
        search: search as string,
      });
      
      return formatJSONResponse(200, result);
    } catch (error) {
      return formatJSONResponse(500, {
        message: error instanceof Error ? error.message : 'Internal server error',
        error: true
      });
    }
  }
);

/**
 * POST handler for creating a new user
 */
export const post = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { body } = parseEvent(event);
    
    try {
      // Validate required fields
      if (!body.email || !body.name) {
        return formatJSONResponse(400, {
          message: 'Missing required fields: email and name are required',
          error: true
        });
      }
      
      // Call the service function to create a user
      const newUser = await userService.createUser(body);
      return formatJSONResponse(201, {
        message: 'User created successfully',
        user: newUser
      });
    } catch (error) {
      return formatJSONResponse(500, {
        message: error instanceof Error ? error.message : 'Internal server error',
        error: true
      });
    }
  }
);
