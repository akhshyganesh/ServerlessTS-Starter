import { ServerlessFunction } from '../../types/serverless';

/**
 * Configuration for hello functions
 */
const functions: Record<string, ServerlessFunction> = {
  hello: {
    handler: 'src/functions/hello/handler.main',
    events: [
      {
        http: {
          path: 'hello',
          method: 'get',
          cors: true
        }
      }
    ]
  },
  
  helloPost: {
    handler: 'src/functions/hello/handler.post',
    events: [
      {
        http: {
          path: 'hello',
          method: 'post',
          cors: true
        }
      }
    ]
  }
};

export = functions;
