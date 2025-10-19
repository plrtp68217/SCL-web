import authorizationApi from "./authorization.api";
import recordsApi from "./records.api";
import actionsApi from "./actions.api";
import channelsApi from './channels.api'

export const api = {
  auth: authorizationApi,
  records: recordsApi,
  actions: actionsApi,
  channels: channelsApi,
}