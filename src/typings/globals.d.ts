// https://github.com/microsoft/TypeScript/issues/30459
declare global {
  namespace globalThis  {
    // Must be `var`
    var __IS_BROWSER__: boolean | undefined;
    var __IS_MOCK_MODE__: boolean | undefined;
    var __NODE_ENV__: 'development' | 'production' | undefined;
  }

  interface Window {
    __PRELOADED_STATE__: {
      feature: {
        features: {[key: string]: any}
      }
    };
  }
}

// Fixes ts(2669):
export {}
