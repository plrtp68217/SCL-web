import apiClient from "./apiClient";
import type { LoginUserDto } from "./types/authorization";
import type { User } from "./types/users";

class AuthError extends Error {
  funcName: string;

  constructor(message: string, funcName: string) {
    super(message);

    this.name += ' AUTH';
    this.funcName = funcName;
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