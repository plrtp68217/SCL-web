import authorizationApi from "./authorization.api";
import recordsApi from "./records.api";
import actionsApi from "./actions.api";

export const api = {
  auth: authorizationApi,
  records: recordsApi,
  actions: actionsApi,
}