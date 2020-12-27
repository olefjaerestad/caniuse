import { IBrowserVersion } from '../data-types';

export function getMaxBrowserVersion(versions: IBrowserVersion[]): IBrowserVersion {
  return getMinOrMaxBrowserVersion(versions, 'max');
}

export function getMinBrowserVersion(versions: IBrowserVersion[]): IBrowserVersion {
  return getMinOrMaxBrowserVersion(versions, 'min');
}

function getMinOrMaxBrowserVersion(versions: IBrowserVersion[], minOrMax: 'min' | 'max'): IBrowserVersion {
  return [...versions].sort((a: IBrowserVersion, b: IBrowserVersion) => {
    const versionA = getVersionNumberArray(a);
    const versionB = getVersionNumberArray(b);

    for (let i = 0; i < versionA.length; ++i) {
      const subVersionA = versionA[i];
      const subVersionB = versionB[i];

      // TODO: Might have to tweak this logic?
      if ([subVersionA, subVersionB].includes(undefined)) {
        return 0;
      }

      if (subVersionB !== subVersionA) {
        return minOrMax === 'min' 
          ? subVersionA - subVersionB 
          : subVersionB - subVersionA;
      }
    }
    
    return 0;
  })[0];
}

function getVersionNumberArray(version: IBrowserVersion): number[] {
  return version.version.split('.').map((subVersion: string) => Number(subVersion));
}
