globalThis.__IS_MOCK_MODE__ = process.env.IS_MOCK_MODE === 'true' ? true : false;
globalThis.__NODE_ENV__ = process.env.NODE_ENV  as 'development' | 'production';
