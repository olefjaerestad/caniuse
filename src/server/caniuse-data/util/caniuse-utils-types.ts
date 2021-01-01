import { ICanIUseFunctionality, TCanIUseAgentName } from '../data-types';
import { TBrowser } from '../../google-analytics/data-types';

export type TFunctionalityFirstSupportedIn = {
  [agentName in TCanIUseAgentName]?: string;
}

export type TFunctionalitySupportedInLatestBrowserVersion = {
  [agentName in TCanIUseAgentName]?: TSupportStatus;
}

export type TSupportStatus = {
  [key in TBrowser]: 'supported' | 'not_supported' | 'partial_support';
}

export type TBrowserMapping = {
  [gaBrowser in TBrowser]: TCanIUseAgentName;
}

export interface IFunctionality {
  [functionality: string]: Pick<ICanIUseFunctionality, 'description' | 'title'> & {
    firstFullySupportedIn: TFunctionalityFirstSupportedIn;
    firstPartiallySupportedIn: TFunctionalityFirstSupportedIn;
    notes_by_num: ICanIUseFunctionality['notes_by_num'];
    supportedInLatestBrowserVersion: TFunctionalitySupportedInLatestBrowserVersion;
    supportStatus: TSupportStatus[keyof TSupportStatus];
    supportStatusByBrowser: TSupportStatus;
    url: string;
  };
}
