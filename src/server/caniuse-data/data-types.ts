import {
  TCanIUseCssCategory, 
  TCanIUseHtmlCategory, 
  TCanIUseJsCategory, 
  TCanIUseJsApiCategory, 
  TCanIUseOtherCategory, 
  TCanIUseSecurityCategory, 
  TCanIUseSvgCategory,
  TCanIUseAgentName,
  ICanIUseFunctionality,
  TCanIUseBrowserSupportString
} from '../../common/types/caniuse-types';

export {
  TCanIUseAgentName,
  ICanIUseFunctionality,
  TCanIUseBrowserSupportString
};

interface ICanIUseAgent {
  abbr: string;
  browser: string;
  prefix: string;
  prefix_exceptions?: {
    [version: string]: string;
  }
  type: 'desktop' | 'mobile';
  usage_global: {
    [version: string]: number;
  };
  versions: (null|string)[];
}

export interface ICanIUseData {
  agents: {
    [agentName in TCanIUseAgentName]: ICanIUseAgent;
  };
  'cats': {
    CSS: TCanIUseCssCategory[];
    HTML5: TCanIUseHtmlCategory[];
    JS: TCanIUseJsCategory[];
    'JS API': TCanIUseJsApiCategory[];
    Other: TCanIUseOtherCategory[];
    Security: TCanIUseSecurityCategory[];
    SVG: TCanIUseSvgCategory[];
  };
  data: {
    [functionality: string]: ICanIUseFunctionality;
  }
  eras: {
    'e-3': '3 versions back';
    'e-2': '2 versions back';
    'e-1': 'Previous version';
    'e0': 'Current';
    'e1': 'Near future';
    'e2': 'Farther future';
    'e3': '3 versions ahead';
    [key: string]: string;
  };
  statuses: {
    cr: 'W3C Candidate Recommendation';
    ls: 'WHATWG Living Standard';
    other: 'Other';
    pr: 'W3C Proposed Recommendation';
    rec: 'W3C Recommendation';
    unoff: 'Unofficial / Note';
    wd: 'W3C Working Draft';
  };
  updated: number;
}
