// This file serves as a bridge to load TypeScript configuration in Serverless Framework
require('ts-node/register');
// Register TypeScript path aliases for runtime resolution
require('tsconfig-paths/register');
const functions = require('./src/functions/index.ts');

// Export the functions for Serverless to use
module.exports = functions();
