import { ServerlessFunction } from '../types/serverless';

/**
 * Helper utility to create standardized function configurations
 */

interface AdditionalConfig {
  [key: string]: any;
}

/**
 * Creates a standard HTTP GET endpoint configuration
 */
export const httpGet = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'get',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};

/**
 * Creates a standard HTTP POST endpoint configuration
 */
export const httpPost = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'post',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};

/**
 * Creates a standard HTTP PUT endpoint configuration
 */
export const httpPut = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'put',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};

/**
 * Creates a standard HTTP PATCH endpoint configuration
 */
export const httpPatch = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'patch',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};

/**
 * Creates a standard HTTP DELETE endpoint configuration
 */
export const httpDelete = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'delete',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};

/**
 * Creates a standard HTTP OPTIONS endpoint configuration
 */
export const httpOptions = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'options',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};

/**
 * Creates a standard HTTP HEAD endpoint configuration
 */
export const httpHead = (
  name: string, 
  handlerPath: string, 
  handlerMethod: string = 'main', 
  path?: string, 
  additionalConfig: AdditionalConfig = {}
): Record<string, ServerlessFunction> => {
  return {
    [name]: {
      handler: `${handlerPath}.${handlerMethod}`,
      events: [
        {
          http: {
            path: path || name,
            method: 'head',
            cors: true
          }
        }
      ],
      ...additionalConfig
    }
  };
};
