import authorizationApi from "./authorization.api";
import usersApi from "./users.api";
import recordsApi from "./records.api";
import actionsApi from "./actions.api";
import channelsApi from './channels.api'
import activitysApi from "./activitys.api";

export const api = {
  auth: authorizationApi,
  users: usersApi,
  records: recordsApi,
  actions: actionsApi,
  channels: channelsApi,
  activitys: activitysApi,
}