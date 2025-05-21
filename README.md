# Storepages CLI

Command-line interface tool for local development of store pages themes.

## Features

- Preview changes to themes using development themes
- Hot reload CSS and automatically refresh a page on file change, when previewing a theme
- Export a zip theme file ready to use on Store Pages
- Minify JS & CSS on build

## Installation

Since our plugin is a NPM package but not in a public packages server, the package is inserted in the `package.json` as this (note that version is in semver format):

```
"dependencies": {
  ...
  "storepages-cli": "https://github.com/localistico/storepages-cli.git#semver:2.0.0"
  ...
}
```

Open your `package.json` file and add the following `scripts`:

```
{
  "scripts": {
    "dev": "storepages dev",
    "build": "storepages build"
  }
}
```

## Commands

These scripts refer to the different stages of developing a theme.

- `storepages dev`: Preview a Store Page Theme with hot reloading.

- `storepages build`: Build a Store Page Theme and create a Zip file ready for production.<br>
  Avoid JS & CSS assets minification with `--no-minify`

## Directories

### The `theme` directory

You can download your current theme from https://storepages.localistico.com/app or use our [Store Pages Default Theme](https://github.com/localistico/l-store-pages-default-theme/releases).

The whole theme is defined inside the theme folder by the following file structure:

```
└── theme
    ├── assets
    ├── locales
    ├── snippets
    ├── templates
    ├── 404.liquid
    ├── robots.txt
    └── theme.json
```

- **Assets**: The assets directory contains all of the assets used in a theme, including image, CSS, and JavaScript files. Use the asset_path tag to reference an asset within your theme.

- **Locales**: The locales directory contains the locale files for a theme, which are used to provide translated content.

- **Snippets**: The snippets directory contains Liquid files that host smaller reusable snippets of code. You can reference these snippets throughout the theme with the liquid snippet tag.

- **Templates**: The templates directory contains a theme’s template files, which control what’s rendered on each type of page.

- **404.liquid**: Required template for 404 error page

- **Robots.txt**: Required file for robots.txt file for search engines

- **Theme.json**: Contains the config for a theme

### The `data` directory

In case you want to preview the same data than the platform you need to download the information from the portal.

1. Go to https://storepages.localistico.com/app
2. Go to pages and select the page
3. Click `<> View json` to download the data
4. Create the json file with corresponding template `type`:

- `locator.json`
- `store.json`
- `landing.json`
- `city.json`
- `administrative_area_level2.json`
- `administrative_area_level1.json`
- `country.json`
- `widget_locator.json`
- `widget_store.json`

### The `src` directory

Powered by [esbuild](https://esbuild.github.io/) you can transform and bundle any JavaScript, CSS, TypeScript, and JSX files in this directory into the `assets` folder. Sourcemap is enabled in development mode and only root files are compiled.

Use a custom esbuild config with `--esbuild-config` or a default `esbuild.config.js` file in the root of your project directory

```
const esbuildConfig = {
  /* config options here */
}

export default esbuildConfig
```

## Run the development server

1. Run `npm run dev` to start the development server.
2. Visit `http://localhost:3000` to view the list of available templates.
3. Edit a file and save it to see the updated result in your browser.
