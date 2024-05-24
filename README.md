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
  "storepages-cli": "https://github.com/localistico/storepages-cli.git#semver:1.0.0"
  ...
}
```

Open your `package.json` file and add the following `scripts`:

```
{
  "scripts": {
    "dev": "storepages dev",
    "build": "storepages build",
    "data": "storepages data --host=null-island-cafe.localisti.co"
  }
}
```

## Commands

These scripts refer to the different stages of developing a theme.

- `storepages dev`: Preview a Store Page Theme with hot reloading.

- `storepages build`: Build a Store Page Theme and create a Zip file ready for production.<br>
  Avoid JS & CSS assets minification with `--no-minify`

- `storepages data`: Download Store Page information from pages_api/locations to create a partial mock of your pages.<br>
  Change the domain with `--host`

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

In case you want to preview the same data than the platform you need to download the information from `pages_api/v1/locations` and the `variables` within a page.

1. Download `pages_api/v1/locations` with `npm run data`.
2. Go to https://storepages.localistico.com/app
3. Go to pages and select the page
4. Click `<> View json` to download the data
5. Create the json file with corresponding template `type`:

- `locator.json`
- `store.json`
- `landing.json`
- `city.json`
- `administrative_area_level2.json`
- `administrative_area_level1.json`
- `country.json`

## Run the development server

1. Run `npm run dev` to start the development server.
2. Visit `http://localhost:3000` to view the list of available templates.
3. Edit a file and save it to see the updated result in your browser.
