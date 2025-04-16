/**
 * Business logic for the hello function
 */
export const helloService = {
  /**
   * Generate a hello message for the given name
   */
  sayHello: async (name: string = 'World') => {
    return {
      message: `Hello ${name}, welcome to the serverless world!`,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Process posted data and return a response
   */
  processData: async (data: Record<string, any>) => {
    const name = data.name || 'World';
    return {
      message: `Hello ${name}, data received successfully`,
      timestamp: new Date().toISOString(),
      receivedData: data,
    };
  }
};
