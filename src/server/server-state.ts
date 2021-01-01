import { ICanIUseData } from './caniuse-data/data-types';
import { TBrowserUsageData } from './google-analytics/data-types';

interface IServerState {
  browserSupportData?: ICanIUseData;
  browserUsageData?: TBrowserUsageData;
}

/* type ISetServerStateParam = {
  browserSupportData?: IServerState['browserSupportData'];
  browserUsageData?: IServerState['browserUsageData'];
} */

const serverState: IServerState = {};

/* export function setServerState(props: ISetServerStateParam) {
  Object.entries(props).forEach(([key, val]) => {
    serverState[key] = val;
  });
} */
export function setServerState<T extends keyof IServerState>(key: T, val: IServerState[T]) {
  serverState[key] = val;
}

export function getServerState<T extends keyof IServerState>(key: T): IServerState[T] {  
  return serverState[key];
}
