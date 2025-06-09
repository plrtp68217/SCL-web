import apiClient from "./apiClient";
import type { LoginUserDto } from "./types/authorization";


export default {
  login(dto: LoginUserDto) {
    return apiClient.post('/authorization', dto);
  }
}