# caniuse
Check if you can use a certain CSS or JS feature on your site based on browser usage data from Google Analytics.

## Dev
Duplicate `config/config-example.json` into `config/config.json` and add your info here. Remember to delete the comments.

`npm i`

`npm run dev`

> Dev uses `tsc-watch`, `snowpack` and `nodemon` for transpiling and serving. `react` is used for the frontend, both through server side rendering and client side hydration.

## Prod
`npm i`

`npm run build`

`npm run start`

## Notes
- Src files (the files you actually edit) are located in `src`.
- Dev files (used by dev server, for local development) are located in `dist`. These are compiled from `src`.
- Prod files (bundled, production ready files) are located in `build`. These are compiled from `src`.
