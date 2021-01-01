type TCanIUseCssCategory = 'CSS' | 'CSS2' | 'CSS3';
type TCanIUseHtmlCategory = 'Canvas' | 'HTML5';
type TCanIUseJsCategory = 'JS';
type TCanIUseJsApiCategory = 'JS API';
type TCanIUseOtherCategory = 'Other' | 'DOM' | 'PNG';
type TCanIUseSecurityCategory = 'Security';
type TCanIUseSvgCategory = 'SVG';

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

export type TCanIUseAgentName = 
  'android' // Android Browser
| 'and_chr' // Chrome for Android
| 'and_ff' // Firefox for Android
| 'and_uc' // UC Browser for Android
| 'and_qq' // QQ Browser
| 'baidu' // Baidu Browser
| 'bb' // Blackberry Browser
| 'chrome'
| 'edge'
| 'firefox'
| 'ie'
| 'ie_mob'
| 'ios_saf'
| 'kaios' // KaiOS Browser
| 'op_mini'
| 'op_mob'
| 'opera'
| 'safari'
| 'samsung'; // Samsung Internet

export type TCanIUseBrowserSupportString = 'n' | 'y' | 'u' | 'a #1' | 'a #2' | 'n #1' | 'n #2' | string;

export interface ICanIUseFunctionality {
  // categories: string[];
  categories: keyof (
    TCanIUseCssCategory | 
    TCanIUseHtmlCategory | 
    TCanIUseJsCategory | 
    TCanIUseJsApiCategory | 
    TCanIUseOtherCategory | 
    TCanIUseSecurityCategory | 
    TCanIUseSvgCategory)[];
  description: string;
  keywords: string;
  links: {title: string, url: string}[];
  notes: string;
  notes_by_num: {
    [num: string]: string;
  };
  parent: string;
  spec: string;
  stats: {
    // [agentName in TCanIUseAgentName]: {
    //   [version: string]: TCanIUseBrowserSupportString;
    // }
    // Need to use Map, as key order is important.
    [agentName in TCanIUseAgentName]: Map<string, TCanIUseBrowserSupportString>
  };
  status: string;
  title: string;
  ucprefix: boolean;
  usage_perc_y: number;
  usage_perc_a: number;
  chrome_id: string;
  firefox_id: string;
  ie_id: string;
  webkit_id: string;
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
