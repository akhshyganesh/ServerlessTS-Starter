# ServerlessTS-Starter: Production-Ready AWS Lambda Template with TypeScript

A comprehensive, enterprise-grade template for developing and deploying AWS Lambda functions using the Serverless Framework v3 and TypeScript. This template provides a robust architecture, optimized configurations, and production-ready patterns to accelerate your serverless development.

## Features

- 🚀 TypeScript support with full type safety
- 📦 Webpack bundling for optimized deployments (~80% smaller package sizes)
- 🧪 Middleware support with Middy for common HTTP concerns
- 🛠 Local development with serverless-offline for API testing
- 🔐 Per-function IAM role definitions for security best practices
- 🔄 Path aliases for cleaner imports
- 🔍 Automatic function discovery and registration
- 🧩 Separation of concerns with handlers, services, and utilities
- 📝 Comprehensive error handling with proper HTTP responses
- 🧠 Smart configuration management with environment separation

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [Serverless Framework](https://www.serverless.com/) v3.x

## Getting Started

1. Clone this repository
```bash
git clone https://github.com/akhshyganesh/ServerlessTS-Starter
cd lambda-ts
```

2. Install dependencies
```bash
npm install
```

3. Run locally
```bash
npm run start
```

4. Deploy to AWS
```bash
npm run deploy
```

## Project Structure

```
/lambda-ts/
├── src/
│   ├── functions/         # Lambda function handlers
│   │   ├── hello/         # Example function with GET/POST methods
│   │   └── users/         # Example CRUD operations for users
│   ├── services/          # Business logic services
│   ├── libs/              # Shared utilities and helpers
│   │   ├── api-gateway.ts # API Gateway response formatting
│   │   ├── lambda.ts      # Lambda middleware setup with Middy
│   │   └── function-config.ts # Function configuration helpers
│   ├── models/            # Data models and types
│   └── types/             # TypeScript type definitions
├── resources/             # CloudFormation resources
├── tests/                 # Testing directory
├── serverless.yml         # Serverless Framework configuration
├── serverless-functions.js # Functions auto-discovery bridge
├── webpack.config.ts      # Webpack configuration for bundling
└── tsconfig.json          # TypeScript configuration
```

## Architecture Overview

This project implements several architectural best practices:

### Function Organization

Each function is isolated in its own directory with three main components:
- **handler.ts**: AWS Lambda handler code
- **service.ts**: Business logic separated from the handler
- **serverless.ts**: Function-specific configuration

### Automatic Function Discovery

The project uses a dynamic function discovery system:
- index.ts automatically scans for function directories
- Each function's serverless.ts exports its configuration
- serverless-functions.js bridges TypeScript to the Serverless Framework

### Middleware Pattern

All Lambda functions use the Middy middleware engine for:
- HTTP request body parsing
- Error handling with proper HTTP status codes
- CORS headers for browser compatibility
- Request/response logging (configurable)

### Type Safety

The project maintains type safety throughout:
- Function event types using AWS Lambda typings
- Custom type definitions for Serverless Framework configurations
- Path aliases for improved import readability and maintenance

## Included Example Functions

### Hello Function

A simple example demonstrating:
- GET endpoint with query parameter support
- POST endpoint with JSON body processing
- Service layer separation

Try it locally:
```bash
# GET request
curl http://localhost:3000/dev/hello?name=YourName

# POST request
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "YourName"}' \
  http://localhost:3000/dev/hello
```

### Users Function

A more complete CRUD example demonstrating:
- GET endpoint with filtering, pagination
- POST endpoint with validation
- Error handling patterns
- Service layer with mock database operations

Try it locally:
```bash
# GET users
curl http://localhost:3000/dev/users?limit=10&offset=0

# Create user
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}' \
  http://localhost:3000/dev/users
```

## Configuration Patterns

### Environment Variables

The project uses the serverless-dotenv-plugin for environment management:
- `.env.example` - Template for required variables
- `.env` - Development environment (gitignored)
- `.env.production` - Production overrides (gitignored)

### Function Configuration Helpers

The function-config.ts utility provides factory functions for common patterns:
- `httpGet()` - Creates a standard HTTP GET endpoint
- `httpPost()` - Creates a standard HTTP POST endpoint

Example:
```typescript
// src/functions/users/serverless.ts
import { httpGet, httpPost } from '@libs/function-config';

export = {
  ...httpGet('getUsers', 'src/functions/users/handler'),
  ...httpPost('createUser', 'src/functions/users/handler')
};
```

## Deployment Options

### Development Environment
```bash
npm run deploy
```

### Production Environment
```bash
npm run deploy:prod
```

### Specific Function Deployment
```bash
npm run deploy -- --function functionName
```

### Remove Deployment
```bash
npm run remove
```

## Testing

The project includes Jest for testing:
```bash
npm test
```

## Extending the Project

### Adding DynamoDB Integration

1. Add DynamoDB permissions to serverless.yml:
```yaml
provider:
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:Query
            - dynamodb:Scan
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
          Resource: !GetAtt MyDynamoDbTable.Arn
```

2. Define your DynamoDB resources:
```yaml
resources:
  Resources:
    MyDynamoDbTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:service}-table-${self:provider.stage}
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
```

3. Create a DynamoDB service in `src/services/dynamodb.ts`:
```typescript
import { DynamoDB } from 'aws-sdk';

export const dynamoClient = new DynamoDB.DocumentClient();

export const dynamoService = {
  get: (tableName: string, key: Record<string, any>) => 
    dynamoClient.get({
      TableName: tableName,
      Key: key
    }).promise(),
  
  put: (tableName: string, item: Record<string, any>) =>
    dynamoClient.put({
      TableName: tableName,
      Item: item
    }).promise()
};
```

### Adding SQS Integration

1. Add SQS configuration to your function:
```yaml
functions:
  processSQS:
    handler: src/functions/queue/handler.main
    events:
      - sqs:
          arn: !GetAtt MySQSQueue.Arn
          batchSize: 10

resources:
  Resources:
    MySQSQueue:
      Type: AWS::SQS::Queue
      Properties:
        QueueName: ${self:service}-queue-${self:provider.stage}
```

2. Create an SQS handler:
```typescript
// src/functions/queue/handler.ts
import { SQSEvent, SQSRecord } from 'aws-lambda';

export const main = async (event: SQSEvent) => {
  const records = event.Records;
  
  for (const record of records) {
    await processRecord(record);
  }
};

async function processRecord(record: SQSRecord) {
  const body = JSON.parse(record.body);
  // Process the message
  console.log('Processing message:', body);
}
```

## Performance Optimizations

This template includes several performance optimizations:

1. **Webpack Bundling**: Reduces package size by ~80% by removing unused code
2. **Cold Start Optimization**: Minimizes external dependencies
3. **Efficient Error Handling**: Prevents uncaught exceptions
4. **Memory Management**: Configurable per-function memory settings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
Feel free to modify this content to better suit your specific needs and project details.
Please do not forget to include this project license
```
