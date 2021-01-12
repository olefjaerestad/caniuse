import { TCanIUseAgentName } from '../data-types';
import { TBrowser } from '../../google-analytics/data-types';

export type TBrowserMapping = {
  [gaBrowser in TBrowser]: TCanIUseAgentName;
}

export {
  TFunctionalityFirstSupportedIn,
  TFunctionalitySupportedInLatestBrowserVersion,
  TSupportStatus,
  IFunctionality
} from '../../../common/types/functionality-types';
