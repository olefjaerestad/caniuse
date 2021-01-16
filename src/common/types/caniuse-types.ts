export type TCanIUseCssCategory = 'CSS' | 'CSS2' | 'CSS3';
export type TCanIUseHtmlCategory = 'Canvas' | 'HTML5';
export type TCanIUseJsCategory = 'JS';
export type TCanIUseJsApiCategory = 'JS API';
export type TCanIUseOtherCategory = 'Other' | 'DOM' | 'PNG';
export type TCanIUseSecurityCategory = 'Security';
export type TCanIUseSvgCategory = 'SVG';

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

export interface ICanIUseFeature {
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
