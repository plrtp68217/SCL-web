import apiClient from "./apiClient";
import type { LoginUserDto } from "./types/authorization";
import type { User } from "./types/users";
import { ApiError } from "./error/apiError";

class AuthError extends ApiError {
  constructor(message: string, funcName: string) {
    super(message, funcName);
    this.name += ' AUTH';
  }
}

export default {
  async login(dto: LoginUserDto): Promise<User> {
    try {
      const response = await apiClient.post('/authorization', dto);
      const user = response.data
      return user;
    }
    catch (error) {
      throw new AuthError(`${error}`, 'login');
    }
  }
}