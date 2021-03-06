# caniuse
Check if you can use a certain CSS or JS feature as mission critical or nice-to-have on your site based on browser usage data from Google Analytics. Not to be confused with (but still big thanks to) [https://github.com/Fyrd/caniuse](https://github.com/Fyrd/caniuse).

![The user interface displaying data about the support status of a browser feature](screenshot.png "The UI")

## Requirements
A node.js environment that supports:
- [Dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)

A browser environment that supports:
- [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS minmax function](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax())
- [Variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
- [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

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

> When installing and using new dependencies, you might need to restart `npm run dev`, so `Snowpack` can transpile the newly added dependencies. The same is true when adding new `MyComponent.module.css` files.

> Dev supports a mock mode, where the app uses local mock data instead of doing actual http calls. To use mock mode, run `npm run mock:generate` (this will create a `mock` folder with the data. Requires a network connection.), then `npm run dev:mock`. Handy for developing offline.

## Prod
Duplicate `config/config-example.json` into `config/config.json` and add your info here. Remember to delete the comments.

`npm i`

`npm run build`

`npm run start`

> Prod uses `rollup` for bundling.

## Notes
- Src files (the files you actually edit) are located in `src`.
- Dev files (used by dev server, for local development) are located in `dev`. These are compiled from `src`.
- Prod files (bundled, production ready files) are located in `build`. These are compiled from `src`.

## Related reading
- [https://github.com/snowpackjs/snowpack/issues/1052](https://github.com/snowpackjs/snowpack/issues/1052)
- [https://github.com/snowpackjs/snowpack/issues/376](https://github.com/snowpackjs/snowpack/issues/376)

## Todo
- Inline TODOs.
- Write tests.
- Fix `ERR_MODULE_NOT_FOUND`on `npm run dev` by only running nodemon _after_ snowpack has finished transpiling. Side note: `nodemon` doesnt seem to restart automatically if provided a config. Update: It does, just remember to use a trailing slash in the watched folders: `"dev/server/"`.
- getSupportDataForMyAudience: return empty object instead of all features if search param is empty?
- Add dropdown menu for selecting which website to fetch GA data from.

## In progress
