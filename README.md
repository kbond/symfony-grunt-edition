Symfony Grunt Edition
=====================

This is a Symfony Edition that replaces Assetic with a grunt configuration.  I have some taken some
liberties based on my development style.  When doing frontend development, I don't like waiting for
some kind of *watch* task.  I like my updates to be instant.  This edition allows for your frontend
assets to be linked to the source in development and linked to the minified version in production.

## Requirements

- npm
- bower (`sudo npm install -g bower`)
- grunt (`sudo npm install -g grunt-cli`)

## Installation

```
> composer install
> bower install
> npm install
> grunt
```

## Grunt Tasks

- `clean`: removes `web/_static` contents
- `jshint`: detect errors in your javascipt
- `uglify`: minify your javascipt
- `cssmin`: minify your css
- `modernizr`: install/configure modernizr based on your javascript files\
- *(default)*: runs all the above

## Configuration

To configure the assets for you project, add them to `app/config/assets.json`.  Both Symfony2 and grunt use
this configuration.

## Summary of changes from the Symfony Standard Edition

### New Files

- `bower.json`: bower package configuration
- `.bowerrc`: bower configuration to install frontend assets to `web/vendor`
- `package.json`: npm package configuration (for grunt)
- `app/config/assets.json`: global asset configuration
- `app/config/config.php`: sets a Symfony2 parameter based on the above `assets.json` configuration
- `gruntfile.js`: configures grunt, assets for minification are pulled from the above `assets.json`
- `web/css/main.css`/`web/js/script.js`: test assets

### Modified Files

- `app/config/config.yml`: added twig global variable `app_assets` which is set to the parameter set in `config.php`
- `app/Resources/views/base.html.twig`: modified the `stylesheets` and `javascripts` block to load these assets
 based on the above `app_assets` configuration (`app.debug=true`: source is used, `app.debug=false`: min is used)

### Other Changes

- Removed Assetic
- Simplifed DemoBundle
- Removed `bootstrap.php.cache` - use composer's `--optimize-autoloader` option
