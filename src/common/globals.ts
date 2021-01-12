globalThis.__IS_BROWSER__ = typeof window === 'object';
globalThis.__IS_MOCK_MODE__ = !__IS_BROWSER__ && process.env.IS_MOCK_MODE === 'true' ? true : false;
globalThis.__NODE_ENV__ = (!__IS_BROWSER__ && process.env.NODE_ENV) as 'development' | 'production';
