import fs from 'fs';
import path from 'path';
import { IConfig } from './config-types';

// TODO: Try to include this within getConfig() somehow.
let configFile: IConfig | null = null;

export function getConfig<KEY1 extends keyof IConfig, KEY2 extends keyof IConfig[KEY1]>(key: KEY1, key2: KEY2): IConfig[KEY1][KEY2];
export function getConfig<KEY1 extends keyof IConfig>(key: KEY1): IConfig[KEY1];
export function getConfig(): IConfig;
export function getConfig(...keys: string[]): any {
  const filePath = path.resolve(__dirname, '../../../../config/config.json');

  if (!configFile) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`missing config file: ${filePath}`);
    }
    
    configFile = JSON.parse(
      fs.readFileSync(
        filePath, {encoding: 'utf-8'}
      )
    );
  }

  if (keys) {
    let returnVal = configFile;
    for (let i = 0; i < keys.length; i++) {
      if (!returnVal) break;
      returnVal = returnVal[keys[i]];
    }
    return returnVal;
  }

  return configFile;
}
