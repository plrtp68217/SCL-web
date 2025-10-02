import { api } from "@/api";
import type { CreateActionDto } from "@/api/types/actions";

export async function logUserAction(dto: CreateActionDto) {
  try {
    return await api.actions.createAction(dto);
  }
  catch (error) {
    throw new Error(`LOG USER ACTION - ${error}`);
  }
}