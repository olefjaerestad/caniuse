# caniuse
Check if you can use a certain CSS or JS feature on your site based on browser usage data from Google Analytics.

## Prerequisites
1. If you haven't already, you need to create a Google Analytics view and include its script on your web site.
2. Create service account credentials at [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials)
3. Grant access to Google Analytics at [https://analytics.google.com/analytics/web/](https://analytics.google.com/analytics/web/): Admin -> Select account -> Select property -> Select view -> View User Management -> Add service account client email with minimum read & analyze rights.

https://analytics.google.com/analytics/web/#/a185728196w256954869p234884534/admin/suiteusermanagement/view
## Dev
Duplicate `config/config-example.json` into `config/config.json` and add your info here. Remember to delete the comments.

`npm i`

`npm run dev`

> Note: This will throw an `ERR_MODULE_NOT_FOUND`. Just keep the script running and eventually all files will be built and the script will run successfully.

> Dev uses `snowpack` and `nodemon` for transpiling and running. `express` is used for the server. `react` is used for the frontend, both through server side rendering and client side hydration. `@olefjaerestad/hmr` is used for hot module replacement/automatic browser reloading.

> Dev supports a mock mode, where the app uses local mock data instead of doing actual http calls. To use mock mode, run `npm run mock:generate` (this will create a `mock` folder with the data. Requires a network connection.), then `npm run dev:mock`. Handy for developing offline.

## Prod
`npm i`

`npm run build`

`npm run start`

> Prod uses `rollup` for bundling.

## Notes
- Src files (the files you actually edit) are located in `src`.
- Dev files (used by dev server, for local development) are located in `dist`. These are compiled from `src`.
- Prod files (bundled, production ready files) are located in `build`. These are compiled from `src`.

## Todo
- Inline TODOs.
- Write tests.
- Fix `ERR_MODULE_NOT_FOUND`on `npm run dev` by only running nodemon _after_ snowpack has finished transpiling. Side note: `nodemon` doesnt seem to restart automatically if provided a config. Update: It does, just remember to use a trailing slash in the watched folders: `"dist/server/"`.

## In progress

## Done
- Prod bundling so that `npm run build` and `npm run start` works.
- Avoid outputting double `<body>` (one for SSR and one client side).
- Fix frontend console errors.
- Delete dist folder before dev'ing.
- Delete build folder before building.
- Increase `npm run dev` speed. Only Snowpack transpile web_modules on first run: https://github.com/snowpackjs/snowpack/issues/1052, https://github.com/snowpackjs/snowpack/issues/376
- Load browser usage and browser support data immediately when server starts up?
- `npm run dev:mock`.
- Set NODE_ENV at compile time on `npm run build` instead of runtime on `npm run start`, for more efficient tree shaking?
- Add endpoint(s) for refreshing browser usage and browser support data in server state.
- Make snowpack support '@olefjaerestad/hmr' without adding it to externalPackage.
- HMR.
