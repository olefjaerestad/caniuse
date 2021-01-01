import fs from 'fs';
import https from 'https';
import { TCanIUseBrowserSupportString, ICanIUseData } from './data-types';

export function getBrowserSupportData(): Promise<ICanIUseData> {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'raw.githubusercontent.com',
      path: '/Fyrd/caniuse/master/data.json',
      method: 'GET',
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk.toString();
      });
      res.on('end', () => {
        const parsedData: ICanIUseData = mapBrowserSupportData(
          JSON.parse(data)
        );

        resolve(parsedData);
      });
      res.on('error', (err: Error) => {
        reject(err);
      })
    });
    
    req.end();
  });
}

export function getMockBrowserSupportData(): ICanIUseData {
  const data: any = fs.readFileSync('mock/browser-support-data.json', 'utf-8');
  const parsedData: ICanIUseData = JSON.parse(data);

  return mapBrowserSupportData(parsedData);
}

export function filterSupportData(supportData: ICanIUseData, search: string): ICanIUseData['data'] {
  return Object.entries(supportData.data)
    .filter(([functionality, data]) => {
      return (
        functionality.toLowerCase().includes(search.toLowerCase()) || 
        data.title.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => { // Order alphabetically
      const functionalityA = a[0].toLowerCase();
      const functionalityB = b[0].toLowerCase();

      if (functionalityA < functionalityB) {
        return 1;
      }
      if (functionalityA > functionalityB) {
        return -1;
      }
      return 0;
    })
    .sort((a, b) => { // Order those with `search` in their name first
      const functionalityA = a[0].toLowerCase();
      if (functionalityA.includes(search)) {
        return -1;
      }
      return 1;
    })
    .reduce((acc: ICanIUseData['data'], [functionality, data]) => {
      acc[functionality] = data;
      return acc;
    }, {});
}

function mapBrowserSupportData(data: ICanIUseData) {
  /**
   * JSON.parse changes key order, so we need to change back. 
   * We use map instead of object to guarantee key order.
   * Ref https://github.com/opal/opal/issues/1414
   */
  Object.entries(data.data)
    .forEach(([functionalityName, functionalityData]) => {
      Object.entries(functionalityData.stats).forEach(([browserName, versionData]) => {
        data.data[functionalityName].stats[browserName] = 
          Object.entries(versionData)
            .sort((a, b) => {
              const versionA = parseFloat(a[0]);
              const versionB = parseFloat(b[0]);
              if (versionA < versionB) {
                return -1;
              }
              if (versionA > versionB) {
                return 1;
              }
              return 0;
            })
            .reduce(
              (acc: Map<string, TCanIUseBrowserSupportString>, 
              [version, supportStatusString]) => 
            {
              acc.set(version, supportStatusString);
              return acc;
            }, new Map<string, string>());
      });
    });

  return data;
}
