# Storepages CLI

Command-line interface for local development of Store Pages themes. Preview templates with live reload, bundle assets with esbuild, and export production-ready ZIP files.

**Requires Node.js >= 22.15.0**

## Features

- Live dev server with hot reload — changes to Liquid templates and assets are reflected instantly
- Multi-locale preview with URL-based switching (e.g. `/es/store`)
- Asset bundling via [esbuild](https://esbuild.github.io/) — JS, TS, JSX, TSX, and CSS with inline sourcemaps in dev
- Built-in [PostCSS](https://postcss.org/) support — drop a `postcss.config.js` in your project root to enable Tailwind CSS, autoprefixer, and more
- Custom esbuild config support for advanced bundling setups
- Translation filter (`t`) backed by locale JSON files
- ZIP export with JS & CSS minification for production deployment
- Configurable dev server port with `--port`
- Remote snippet auto-fetching — snippets defined in `theme.json` are downloaded on `dev` or `build` if not already present locally
- Rich error pages in development showing file, line, and column information

## Installation

Since this package is not published to npm, install it directly from GitHub in your `package.json` (use semver format for the version):

```json
"dependencies": {
  "storepages-cli": "https://github.com/localistico/storepages-cli.git#semver:2.2.0"
}
```

Then run:

```
npm install
```

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "storepages dev",
    "build": "storepages build",
    "start": "storepages start"
  }
}
```

## Commands

### `storepages dev`

Starts a local development server with hot reloading. Compiles source files on startup and watches for changes.

```
npm run dev
```

| Option | Default | Description |
|--------|---------|-------------|
| `--theme-path <path>` | `./theme` | Path to the theme directory |
| `--source-path <path>` | `./src` | Path to the source directory |
| `--temp-path <path>` | `./.temp` | Intermediate build directory for compiled assets |
| `--data-path <path>` | `./data` | Path to local data JSON files |
| `--esbuild-config <filepath>` | `./esbuild.config.js` | Custom esbuild config file |
| `--port <number>` | `3000` | Port to run the dev server on |

**Example — run on a different port:**

```
storepages dev --port 4000
```

### `storepages build`

Compiles and packages the theme into a ZIP file ready for upload to Store Pages.

```
npm run build
```

| Option | Default | Description |
|--------|---------|-------------|
| `--theme-path <path>` | `./theme` | Path to the theme directory |
| `--source-path <path>` | `./src` | Path to the source directory |
| `--temp-path <path>` | `./.temp` | Intermediate build directory |
| `--build-path <path>` | `./dist` | Output directory for the ZIP file |
| `--esbuild-config <filepath>` | `./esbuild.config.js` | Custom esbuild config file |
| `--no-minify` | — | Skip JS & CSS minification |

**Example — build without minification:**

```
storepages build --no-minify
```

### `storepages start`

Serves a previously built theme from the `./dist/theme` directory. No compilation or file watching — useful for previewing the production output locally.

```
npm run start
```

| Option | Default | Description |
|--------|---------|-------------|
| `--build-path <path>` | `./dist/theme` | Path to the built theme directory |
| `--data-path <path>` | `./data` | Path to local data JSON files |
| `--port <number>` | `3000` | Port to run the server on |

**Example — serve a custom build path:**

```
storepages start --build-path ./dist/my-theme
```

## Project structure

```
project/
├── theme/                     # Theme files (--theme-path)
│   ├── assets/                # Static assets: images, fonts, pre-built CSS/JS
│   ├── locales/               # Translation JSON files (one per locale)
│   ├── snippets/              # Reusable Liquid snippets
│   ├── remote_snippets/       # Remote-fetched snippets (take priority over snippets/)
│   ├── templates/             # Page template files
│   ├── 404.liquid             # Required — 404 error page template
│   ├── robots.txt             # Required — robots.txt for search engines
│   └── theme.json             # Required — theme configuration
├── src/                       # Source files to bundle (--source-path)
├── data/                      # Local data JSON files for dev preview (--data-path)
├── esbuild.config.js          # Optional — custom esbuild configuration
└── package.json
```

## `theme.json` reference

The theme configuration file is required and must be placed at `theme/theme.json`.

```json
{
  "name": "My Theme",
  "default_locale": "en",
  "published_locales": ["en", "es"],
  "templates": [
    {
      "key": "store",
      "type": "store",
      "template": "store.liquid",
      "content_type": "text/html"
    },
    {
      "key": "store-locator",
      "type": "locator",
      "template": "locator.liquid",
      "content_type": "text/html"
    }
  ],
  "variables": {
    "primary_color": "#ff5500"
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Theme display name — used in the ZIP filename |
| `default_locale` | string | Default language code (e.g. `en`, `es`) |
| `published_locales` | string[] | All enabled locales — each gets a URL prefix (e.g. `/es/`) |
| `templates` | array | List of page template definitions |
| `variables` | object | Custom key/value pairs, accessible in templates as `theme_variables` |
| `remote_snippets` | array | Snippets to auto-fetch from remote URLs before `dev` or `build` |

### Template fields

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | URL path for the template (e.g. `store` → `/store`) |
| `type` | string | Data context type — determines which `data/*.json` file loads |
| `template` | string | Liquid file path relative to the theme directory |
| `content_type` | string | HTTP content type (e.g. `text/html`) |

### `remote_snippets`

Defines snippets to be fetched from remote URLs before `dev` or `build` runs. The CLI checks whether the file already exists in `theme/remote_snippets/` — if not, it downloads the content from `source` and saves it as `{key}.liquid`. Re-running `dev` or `build` skips snippets that are already present.

Fetched snippets take priority over files in `theme/snippets/` (see the [`snippet`](#snippet) tag).

```json
{
  "remote_snippets": [
    {
      "name": "remote-common-mdd",
      "key": "remote-common-mdd",
      "source": "https://www.example.com/snippets/mdd/"
    },
    {
      "name": "remote-common-footer",
      "key": "remote-common-footer",
      "source": "https://www.example.com/snippets/footer/"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name used in log output |
| `key` | string | Filename used when saving — stored as `remote_snippets/{key}.liquid` |
| `source` | string | URL to fetch the snippet content from |

### Valid `type` values

| Type | Data file | Description |
|------|-----------|-------------|
| `store` | `data/store.json` | Single location page |
| `locator` | `data/locator.json` | Multi-location finder |
| `landing` | `data/landing.json` | Landing page |
| `city` | `data/city.json` | City-level area page |
| `country` | `data/country.json` | Country-level page |
| `administrative_area_level1` | `data/administrative_area_level1.json` | State / province page |
| `administrative_area_level2` | `data/administrative_area_level2.json` | County / district page |
| `widget_store` | `data/widget_store.json` | Embeddable store widget |
| `widget_locator` | `data/widget_locator.json` | Embeddable locator widget |

## Liquid tags

The CLI extends LiquidJS with the following custom tags.

### `asset_path`

Outputs the URL path to a file in the assets directory.

```liquid
<img src="{% asset_path 'logo.png' %}" />
<!-- outputs: /assets/logo.png -->
```

### `asset_content`

Inlines the raw content of an asset (`.css`, `.js`, or `.svg`) directly into the page.

```liquid
<style>{% asset_content 'main.css' %}</style>
<script>{% asset_content 'main.js' %}</script>
```

### `snippet`

Includes a Liquid snippet from `theme/snippets/` and passes named parameters to it. If a matching file exists in `theme/remote_snippets/`, it takes priority. Remote snippets defined in `theme.json` are fetched automatically on startup — see [`remote_snippets`](#remote_snippets).

```liquid
{% snippet 'header' %}
{% snippet 'card' title: location.name, url: location.url %}
```

Inside the snippet, access parameters via `snippet.param_name`:

```liquid
{# snippets/card.liquid #}
<div class="card">
  <h2>{{ snippet.title }}</h2>
  <a href="{{ snippet.url }}">View</a>
</div>
```

### `find_page_url`

Returns the URL of a template by its `key` as defined in `theme.json`, respecting the current locale prefix.

```liquid
<a href="{% find_page_url 'store-locator' %}">Find a store</a>
<!-- outputs: /store-locator (or /es/store-locator in Spanish) -->
```

### `location_json_ld`

Renders a `<script type="application/ld+json">` block with schema.org structured data for a location. Accepts optional named parameters to override values.

```liquid
{% location_json_ld location.id %}

{% location_json_ld location.id
  type: 'Restaurant'
  template_key: 'store' %}
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `type` | `LocalBusiness` | schema.org type |
| `name` | `location.name` | Override the schema name |
| `description` | `location.summary` | Override the description |
| `template_key` | `store` | Template key used to build the canonical URL |

### `content_for_head`

Renders `<link rel="alternate">` hreflang tags for all published locales. Place inside `<head>`.

```liquid
<head>
  {% content_for_head %}
</head>
```

Output example:

```html
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="es" href="/es/">
```

## Liquid filters

### `t` — Translation

Looks up a dot-notation key in `theme/locales/{locale}.json` and returns the translated string. Supports variable interpolation using `{{ var }}` syntax in the locale value.

```liquid
{{ 'general.404.title' | t }}
{{ 'general.greeting' | t: name: location.name }}
```

Locale file (`locales/en.json`):

```json
{
  "general": {
    "404": { "title": "Page not found" },
    "greeting": "Welcome to {{ name }}"
  }
}
```

### `group_by` — Group array by property

Groups an array of objects by the value of a property. Returns an array of group objects with `name`, `items`, and `size`.

```liquid
{% assign by_region = locations | group_by: 'region' %}
{% for group in by_region %}
  <h2>{{ group.name }} ({{ group.size }})</h2>
  {% for loc in group.items %}
    <p>{{ loc.name }}</p>
  {% endfor %}
{% endfor %}
```

### `distance_to_human` — Format distance

Converts a distance in meters to a human-readable string.

```liquid
{{ location.distance | distance_to_human }}
<!-- 500   → "500 m"  -->
<!-- 1500  → "1.5 km" -->
```

### `parse_json` — Parse JSON string

Parses a JSON string into an object or array that can be iterated in Liquid.

```liquid
{% assign items = custom_attribute_data | parse_json %}
{% for item in items %}
  {{ item.name }}
{% endfor %}
```

### `parse_csv` — Parse CSV string

Parses a CSV string into an array. Pass `"headers", true` to use the first row as keys and return objects.

```liquid
{% assign rows = csv_block | parse_csv: "headers", true %}
{% for row in rows %}
  {{ row.Name }} — {{ row.City }}
{% endfor %}
```

## The `data/` directory

When running the dev server, the CLI loads data from `data/` to populate templates. This lets you preview templates with realistic content without connecting to the live platform.

To use real data, download it from the platform:

1. Go to [storepages.localistico.com/app](https://storepages.localistico.com/app)
2. Navigate to Pages and open a page
3. Click **`<> View json`** to download the data
4. Save the file to `data/` using the matching filename for the template type:

| Template type | File |
|---------------|------|
| `store` | `data/store.json` |
| `locator` | `data/locator.json` |
| `landing` | `data/landing.json` |
| `city` | `data/city.json` |
| `country` | `data/country.json` |
| `administrative_area_level1` | `data/administrative_area_level1.json` |
| `administrative_area_level2` | `data/administrative_area_level2.json` |
| `widget_store` | `data/widget_store.json` |
| `widget_locator` | `data/widget_locator.json` |

If a data file is missing, the CLI falls back to built-in placeholder data so templates always render.

## The `src/` directory & esbuild

Place JavaScript, TypeScript, JSX, TSX, and CSS source files in `src/`. Only **root-level files** are used as entry points — subdirectory files are bundled as imports, not compiled separately.

Compiled output goes to `.temp/assets/` during development and is copied into the theme on build. Sourcemaps are enabled inline in dev mode and removed in production builds.

### PostCSS

PostCSS is built in. To enable it, add a `postcss.config.js` to your project root and install any plugins you need:

```sh
npm install --save-dev postcss autoprefixer
```

```js
// postcss.config.js
export default {
  plugins: {
    autoprefixer: {},
  },
}
```

CSS files at the root of `src/` are compiled as standalone entry points. To use PostCSS with Tailwind CSS:

```sh
npm install --save-dev postcss tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Custom esbuild config

Create `esbuild.config.js` (or point to another file with `--esbuild-config`) to extend the default config. Your values are merged on top of the defaults.

**Object export:**

```js
// esbuild.config.js
export default {
  loader: { '.png': 'dataurl' },
  target: 'es2020',
}
```

**Function export** (receives the current command and default config):

```js
// esbuild.config.js
export default async function (command, defaultConfig) {
  if (command === 'dev') {
    return { sourcemap: 'inline' }
  }
  return { sourcemap: false }
}
```

## Run the development server

1. Run `npm run dev` to start the development server.
2. Visit `http://localhost:3000` (or your custom `--port`) to see the list of available templates.
3. For multi-locale themes, visit `http://localhost:3000/es` to preview in another locale.
4. Edit any template, snippet, asset, or locale file and save — the browser refreshes automatically.
