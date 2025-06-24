import { api } from "@/api";
import type { CreateActionDto } from "@/api/types/actions";

export async function logUserAction(dto: CreateActionDto) {
  return await api.actions.createAction(dto);
}