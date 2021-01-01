import { ICanIUseData } from '../data-types';
import { TBrowserUsageData } from '../../google-analytics/data-types';
import { 
  IFunctionality, 
  TBrowserMapping, 
  TFunctionalityFirstSupportedIn, 
  TFunctionalitySupportedInLatestBrowserVersion, 
  TSupportStatus 
} from './caniuse-utils-types';

const gaBrowserNameToCanIUseBrowserName: TBrowserMapping = {
  'Android Webview': 'android',
  'Chrome': 'chrome',
  'Firefox': 'firefox',
  'Opera': 'opera',
  'Safari': 'safari',
  // TODO: Still need to map to these caniuse browsers.
  // 'and_chr' // Chrome for Android
  // 'and_ff' // Firefox for Android
  // 'and_uc' // UC Browser for Android
  // 'and_qq' // QQ Browser
  // 'baidu' // Baidu Browser
  // 'bb' // Blackberry Browser
  // 'edge'
  // 'ie'
  // 'ie_mob'
  // 'ios_saf'
  // 'kaios' // KaiOS Browser
  // 'op_mini'
  // 'op_mob'
  // 'samsung' // Samsung Internet
}

export function getBrowserSupport(
  browserData: TBrowserUsageData, 
  supportData: ICanIUseData['data']
): IFunctionality
{
  const browserUsageData = Object.entries(browserData);

  // Build IFunctionality object
  const functionality = Object.entries(supportData).reduce((acc: IFunctionality, [functionalityName, functionalityData]) => {
    const firstFullySupportedIn: TFunctionalityFirstSupportedIn = {};
    const firstPartiallySupportedIn: TFunctionalityFirstSupportedIn = {};
    const supportedInLatestBrowserVersion: TFunctionalitySupportedInLatestBrowserVersion = {};
    const browsers = Object.entries(functionalityData.stats);
    let supportStatus: TSupportStatus[keyof TSupportStatus] = 'supported';
    let supportStatusByBrowser: TSupportStatus = {};

    for (let i = 0; i < browsers.length; ++i) {
      const browserName = browsers[i][0];
      const versionsMap = browsers[i][1];
      const versionsIterator = versionsMap.entries();
      supportedInLatestBrowserVersion[browserName] = Array.from(versionsMap).pop()[1];
      
      for (const [version, supportStatus] of versionsIterator) {
        // Note: This logic will break if functionality is supported in e.g. v44 but not in v45,
        // which is why we have `supportedInLatestBrowserVersion`.
        // e.g. https://caniuse.com/svg-fonts
        if (supportStatus === 'y' && !firstFullySupportedIn[browserName]) {
          firstFullySupportedIn[browserName] = version;
        }
        // e.g. 'y #4 #5', 'a #2'
        if (supportStatus !== 'y' && !supportStatus.startsWith('n') && !firstPartiallySupportedIn[browserName]) {
          firstPartiallySupportedIn[browserName] = version;
        }

        if (firstFullySupportedIn[browserName] && firstPartiallySupportedIn[browserName]) {
          break;
        }
      }
    }

    // Find whether each of our users' browsers support functionality. 
    for (let i = 0; i < browserUsageData.length; ++i) {
      const browserName = browserUsageData[i][0];
      const usageData = browserUsageData[i][1];
      supportStatusByBrowser[browserName] = getSupportStatus({
        partiallySupportedInVersion: firstPartiallySupportedIn[
          gaBrowserNameToCanIUseBrowserName[browserName]
        ],
        audienceVersion: usageData.minVersion.version,
        supportedInVersion: firstFullySupportedIn[
          gaBrowserNameToCanIUseBrowserName[browserName]
        ],
      });
    }

    // Find whether functionality is supported by all of our users' browsers. 
    // This is the meat of our app.
    for (let i = 0; i < Object.values(supportStatusByBrowser).length; ++i) {
      const supportStatusForBrowser = Object.values(supportStatusByBrowser)[i];
      if (supportStatusForBrowser === 'not_supported') {
        supportStatus = 'not_supported';
        break;
      }
      if (supportStatusForBrowser === 'partial_support') {
        supportStatus = 'partial_support';
        break;
      }
    }

    acc[functionalityName] = {
      description: functionalityData.description,
      firstFullySupportedIn,
      firstPartiallySupportedIn,
      notes_by_num: functionalityData.notes_by_num,
      supportStatus,
      supportStatusByBrowser,
      supportedInLatestBrowserVersion,
      title: functionalityData.title,
      url: `https://caniuse.com/${functionalityName}`,
    }

    return acc;
  }, {});

  return functionality;
}

/**
 * Given an audience browser version (i.e. the minimum version your web site audience uses)
 * and versions that partially and fully supports a functionality, returns a support status.
 */
function getSupportStatus(
  {
    partiallySupportedInVersion, 
    audienceVersion, 
    supportedInVersion
  }: {
    partiallySupportedInVersion: string;
    audienceVersion: string;
    supportedInVersion: string;
  }
): TSupportStatus[keyof TSupportStatus] {
  if (!supportedInVersion && !partiallySupportedInVersion) {
    return 'not_supported';
  }
  if (audienceVersion === supportedInVersion) {
    return 'supported';
  }
  if (audienceVersion === partiallySupportedInVersion) {
    return 'partial_support';
  }

  const audienceArray = getVersionNumberArray(audienceVersion);
  const partialSupportArray = getVersionNumberArray(partiallySupportedInVersion);
  const supportArray = getVersionNumberArray(supportedInVersion);

  // Decide if we have full support.
  if (supportArray && supportArray.length) {
    for (let i = 0; i < audienceArray.length; ++i) {
      const audienceSubVersion = audienceArray[i];
      const supportSubVersion = supportArray[i];

      if (
        supportSubVersion === undefined ||
        audienceSubVersion > supportSubVersion
      ) {
        return 'supported';
      }
    }
  }

  // Decide if we have partial support.
  if (partialSupportArray && partialSupportArray.length) {
    for (let i = 0; i < audienceArray.length; ++i) {
      const audienceSubVersion = audienceArray[i];
      const partialSupportSubVersion = partialSupportArray[i];

      if (
        partialSupportSubVersion === undefined ||
        audienceSubVersion > partialSupportSubVersion
      ) {
        return 'partial_support';
      }
    }
  }

  return 'not_supported';
}

function getVersionNumberArray(version: string): number[] {
  if (version === undefined) {
    return [];
  }

  return version.split('.').map((subVersion: string) => Number(subVersion));
}
