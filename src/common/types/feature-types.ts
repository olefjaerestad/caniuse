import { ICanIUseFeature, TCanIUseAgentName } from './caniuse-types';
import { TBrowser } from './google-analytics-types';

export type TFeatureFirstSupportedIn = {
  [agentName in TCanIUseAgentName]?: string;
}

export type TFeatureSupportedInLatestBrowserVersion = {
  [agentName in TCanIUseAgentName]?: string;
}

export type TSupportStatus = {
  [key in TBrowser]: 'supported' | 'not_supported' | 'partial_support';
}

export interface IFeatures {
  [feature: string]: IFeature;
}

export interface IFeature {
  description: ICanIUseFeature['description'],
  firstFullySupportedIn: TFeatureFirstSupportedIn;
  firstPartiallySupportedIn: TFeatureFirstSupportedIn;
  notesByNum: ICanIUseFeature['notes_by_num'];
  supportedInLatestBrowserVersion: TFeatureSupportedInLatestBrowserVersion;
  supportStatusByBrowserCritical: TSupportStatus;
  supportStatusByBrowserNonCritical: TSupportStatus;
  supportStatusCritical: TSupportStatus[keyof TSupportStatus];
  supportStatusNonCritical: TSupportStatus[keyof TSupportStatus];
  title: ICanIUseFeature['title'],
  url: string;
}
