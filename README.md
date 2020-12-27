# caniuse
Check if you can use a certain CSS or JS feature on your site based on browser usage data from Google Analytics.

## Dev
Duplicate `config/config-example.json` into `config/config.json` and add your info here. Remember to delete the comments.

`npm i`

`npm run dev`

> Note: This will throw a `Cannot find module` error first time you run it. Just keep the script running and eventually the required files will be built and the script will continue.

## Prod
`npm run build`

`npm run start`
