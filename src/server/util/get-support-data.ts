import { IFunctionality } from "../../common/types/functionality-types";
import { filterSupportData } from "../caniuse-data/data";
import { getBrowserSupport } from "../caniuse-data/util/caniuse-utils";
import { getServerState } from "../server-state";

export function getSupportDataForMyAudience(featureSearch: string): IFunctionality {
  const browserUsageData = getServerState('browserUsageData');
  const browserSupportData = getServerState('browserSupportData');

  if (!browserUsageData || !Object.keys(browserUsageData).length) {
    throw new Error('Server has no browserUsageData.')
  }

  if (!browserSupportData || !Object.keys(browserSupportData).length) {
    throw new Error('Server has no browserSupportData.')
  }

  const browserSupportDataFiltered = filterSupportData(browserSupportData, featureSearch);
  const supportDataForMyAudience = getBrowserSupport(browserUsageData, browserSupportDataFiltered);

  return supportDataForMyAudience;
}
