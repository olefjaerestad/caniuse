import { TCanIUseAgentName } from '../data-types';
import { TBrowser } from '../../google-analytics/data-types';

export type TBrowserMapping = {
  [gaBrowser in TBrowser]: TCanIUseAgentName;
}

export {
  TFeatureFirstSupportedIn,
  TFeatureSupportedInLatestBrowserVersion,
  TSupportStatus,
  IFeatures
} from '../../../common/types/feature-types';
