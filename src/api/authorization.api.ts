import apiClient from "./apiClient";
import type { LoginUserDto } from "./types/authorization";
import type { User } from "./types/users";
import { ApiError } from "./error/apiError";

import type { SuccessResponse, ErrorResponse } from "./response/response";

class AuthError extends ApiError {
  constructor(message: string, funcName: string) {
    super(message, funcName);
    this.name += ' AUTH';
  }
}

export default {
  async login(dto: LoginUserDto): Promise<User> {
    const response = await apiClient.post('/authorization', dto);

    const responseData: SuccessResponse<User> | ErrorResponse = response.data;

    if (responseData.success) {
      return responseData.data;
    }
    else {
      throw new AuthError(responseData.errorText, 'login')
    }
  }
}