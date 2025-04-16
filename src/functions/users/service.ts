// Interface for a user object
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  [key: string]: any; // Allow additional properties
}

// Input for user creation
interface CreateUserInput {
  name: string;
  email: string;
  [key: string]: any; // Allow additional properties
}

// Parameters for filtering users
interface GetUsersParams {
  limit?: number;
  offset?: number;
  search?: string;
}

/**
 * Business logic for user operations
 */
export const userService = {
  /**
   * Get users with optional filtering
   */
  getUsers: async (params: GetUsersParams = {}): Promise<{ users: User[], total: number }> => {
    // This is a mock implementation - in a real app this would query a database
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: new Date().toISOString()
      }
    ];
    
    let filteredUsers = [...mockUsers];
    
    // Apply search filter if provided
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Get total count before pagination
    const total = filteredUsers.length;
    
    // Apply pagination
    if (params.offset !== undefined) {
      filteredUsers = filteredUsers.slice(params.offset);
    }
    
    if (params.limit !== undefined) {
      filteredUsers = filteredUsers.slice(0, params.limit);
    }
    
    return {
      users: filteredUsers,
      total
    };
  },
  
  /**
   * Create a new user
   */
  createUser: async (input: CreateUserInput): Promise<User> => {
    // This is a mock implementation - in a real app this would insert to a database
    
    // Check if email is already in use (mock validation)
    if (input.email === 'taken@example.com') {
      throw new Error('Email is already in use');
    }
    
    // Create new user with generated ID
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name: input.name,
      email: input.email,
      createdAt: new Date().toISOString(),
      // Copy any additional properties
      ...Object.entries(input)
        .filter(([key]) => !['name', 'email'].includes(key))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    };
    
    return newUser;
  }
};
