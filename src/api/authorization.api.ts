import apiClient from "./apiClient";
import type { LoginUserDto } from "./types/authorization";
import type { User } from "./types/users";


export default {
  async login(dto: LoginUserDto): Promise<User> {
    const response = await apiClient.post('/authorization', dto);
    const user = response.data
    return user;
  }
}