import { ICanIUseData } from '../data-types';
import { IBrowserUsageDataByCriticality } from '../../google-analytics/data-types';
import { 
  IFeatures, 
  TBrowserMapping, 
  TFeatureFirstSupportedIn, 
  TFeatureSupportedInLatestBrowserVersion, 
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
  browserData: IBrowserUsageDataByCriticality, 
  supportData: ICanIUseData['data']
): IFeatures
{
  const browserUsageDataCritical = Object.entries(browserData.criticalFeatures);
  const browserUsageDataNonCritical = Object.entries(browserData.nonCriticalFeatures);

  // Build IFeatures object
  const features = Object.entries(supportData).reduce((acc: IFeatures, [featureName, featureData]) => {
    const firstFullySupportedIn: TFeatureFirstSupportedIn = {};
    const firstPartiallySupportedIn: TFeatureFirstSupportedIn = {};
    const supportedInLatestBrowserVersion: TFeatureSupportedInLatestBrowserVersion = {};
    const browsers = Object.entries(featureData.stats);
    let supportStatusCritical: TSupportStatus[keyof TSupportStatus] = 'supported';
    let supportStatusNonCritical: TSupportStatus[keyof TSupportStatus] = 'supported';
    let supportStatusByBrowserCritical: TSupportStatus = {};
    let supportStatusByBrowserNonCritical: TSupportStatus = {};

    for (let i = 0; i < browsers.length; ++i) {
      const browserName = browsers[i][0];
      const versionsMap = browsers[i][1];
      const versionsIterator = versionsMap.entries();
      supportedInLatestBrowserVersion[browserName] = Array.from(versionsMap).pop()[1];
      
      for (const [version, supportStatus] of versionsIterator) {
        // Note: This logic will break if feature is supported in e.g. v44 but not in v45,
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

    // Find whether each of our users' browsers support critical features. 
    for (let i = 0; i < browserUsageDataCritical.length; ++i) {
      const browserName = browserUsageDataCritical[i][0];
      const usageData = browserUsageDataCritical[i][1];
      supportStatusByBrowserCritical[browserName] = getSupportStatus({
        partiallySupportedInVersion: firstPartiallySupportedIn[
          gaBrowserNameToCanIUseBrowserName[browserName]
        ],
        audienceVersion: usageData.minVersion.version,
        supportedInVersion: firstFullySupportedIn[
          gaBrowserNameToCanIUseBrowserName[browserName]
        ],
      });
    }

    // Find whether each of our users' browsers support non-critical features. 
    for (let i = 0; i < browserUsageDataNonCritical.length; ++i) {
      const browserName = browserUsageDataNonCritical[i][0];
      const usageData = browserUsageDataNonCritical[i][1];
      supportStatusByBrowserNonCritical[browserName] = getSupportStatus({
        partiallySupportedInVersion: firstPartiallySupportedIn[
          gaBrowserNameToCanIUseBrowserName[browserName]
        ],
        audienceVersion: usageData.minVersion.version,
        supportedInVersion: firstFullySupportedIn[
          gaBrowserNameToCanIUseBrowserName[browserName]
        ],
      });
    }

    // Find whether critical features are supported by all of our users' browsers. 
    // This is the meat of our app.
    for (let i = 0; i < Object.values(supportStatusByBrowserCritical).length; ++i) {
      const supportStatusForBrowser = Object.values(supportStatusByBrowserCritical)[i];
      if (supportStatusForBrowser === 'not_supported') {
        supportStatusCritical = 'not_supported';
        break;
      }
      if (supportStatusForBrowser === 'partial_support') {
        supportStatusCritical = 'partial_support';
        break;
      }
    }
    // Find whether non-critical features are supported by all of our users' browsers. 
    for (let i = 0; i < Object.values(supportStatusByBrowserNonCritical).length; ++i) {
      const supportStatusForBrowser = Object.values(supportStatusByBrowserNonCritical)[i];
      if (supportStatusForBrowser === 'not_supported') {
        supportStatusNonCritical = 'not_supported';
        break;
      }
      if (supportStatusForBrowser === 'partial_support') {
        supportStatusNonCritical = 'partial_support';
        break;
      }
    }

    acc[featureName] = {
      description: featureData.description,
      firstFullySupportedIn,
      firstPartiallySupportedIn,
      notesByNum: featureData.notes_by_num,
      supportedInLatestBrowserVersion,
      supportStatusByBrowserCritical,
      supportStatusByBrowserNonCritical,
      supportStatusCritical,
      supportStatusNonCritical,
      title: featureData.title,
      url: `https://caniuse.com/${featureName}`,
    }

    return acc;
  }, {});

  return features;
}

/**
 * Given an audience browser version (i.e. the minimum version your web site audience uses)
 * and versions that partially and fully supports a feature, returns a support status.
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
