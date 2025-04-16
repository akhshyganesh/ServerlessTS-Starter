/**
 * Type definitions for Serverless Framework configurations
 */

export interface HttpEvent {
  http: {
    path: string;
    method: string;
    cors?: boolean;
    authorizer?: any;
    [key: string]: any;
  };
}

export interface SQSEvent {
  sqs: {
    arn: string;
    batchSize?: number;
    [key: string]: any;
  };
}

export interface S3Event {
  s3: {
    bucket: string;
    event: string;
    [key: string]: any;
  };
}

export type EventConfig = HttpEvent | SQSEvent | S3Event;

export interface ServerlessFunction {
  handler: string;
  events?: EventConfig[];
  environment?: Record<string, string>;
  timeout?: number;
  memorySize?: number;
  iamRoleStatements?: any[];
  [key: string]: any;
}
