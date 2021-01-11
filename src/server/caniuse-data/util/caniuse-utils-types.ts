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
    notesByNum: ICanIUseFunctionality['notes_by_num'];
    supportedInLatestBrowserVersion: TFunctionalitySupportedInLatestBrowserVersion;
    supportStatusByBrowserCritical: TSupportStatus;
    supportStatusByBrowserNonCritical: TSupportStatus;
    supportStatusCritical: TSupportStatus[keyof TSupportStatus];
    supportStatusNonCritical: TSupportStatus[keyof TSupportStatus];
    url: string;
  };
}
