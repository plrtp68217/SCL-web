import apiClient from "./apiClient";
import { ApiError } from "./error/apiError";
import type { User } from "./types/users";

class UsersError extends ApiError {
  constructor(message: string, funcName: string) {
    super(message, funcName);
    this.name += ' USERS';
  }
}

export default {
  async updateUser(dto: User): Promise<User> {
    try {
      const response = await apiClient.put('/users', dto);
      const user = response.data;
      return user;
    }
    catch (error) {
      throw new UsersError(`${error}`, 'updateUser');
    }
  }
}