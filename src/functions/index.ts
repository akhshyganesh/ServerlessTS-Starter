import fs from 'fs';
import path from 'path';

/**
 * Automatically discovers all function configurations by scanning the functions directory
 * Each function should have a serverless.ts file that exports its configuration
 */
export = (): Record<string, any> => {
  // Get all directories within the functions folder
  const functionsDir = path.join(__dirname);
  const functionFolders = fs.readdirSync(functionsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Merge all function configurations into a single object
  const functions: Record<string, any> = {};
  
  functionFolders.forEach(folder => {
    try {
      // Look for TypeScript first, then fallback to JavaScript
      let configPath = path.join(functionsDir, folder, 'serverless.ts');
      if (!fs.existsSync(configPath)) {
        configPath = path.join(functionsDir, folder, 'serverless.js');
      }
      
      if (fs.existsSync(configPath)) {
        // Using dynamic import or require based on file extension
        const functionConfig = require(configPath);
        Object.assign(functions, functionConfig);
      }
    } catch (err) {
      console.warn(`Could not load function config from ${folder}: ${(err as Error).message}`);
    }
  });
  
  return functions;
};
