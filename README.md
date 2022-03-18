# Portfolio and CV

A personal portfolio and resume website built with TypeScript, HTML and Sass. This is part of a school assignment where I'm learning how to build a REST API with PHP and consume it with JavaScript/Typescript.

## The website

The website was developed object-oriented with TypeScript. The separate REST API:s public routes are consumed by the website using TypeScript and Fetch API. Node.js and webpack was used to bundle all the TypeScript code and allow use of Sass for styling etc.

### Development server and build

There are two separate scripts in `package.json`. To run the development server use the command `npm run devStart` and to run the build for production use the command `npm run build`. Development files are located in `src/` and the production build end up in `dist/`.

### Files and structure

#### Webpack configurations

Configurations for webpack are made in separate files for development and production: 

- Common configurations can be found in `webpack.common.js`.
- Development configurations can be found in `webpack.dev.js`.
- Production configurations can be found in `webpack.prod.js`.

#### Entry point

The entry point for webpack and the bundle is in `src/index.ts`. It renders the application and imports style.

#### TypeScript

Configurations for TypeScript are made in `tsconfig.json`. The TypeScript-application exist in `src/ts/`. The application entry point is `App.ts` which adds three modules that can be found in `src/ts/modules/`. The modules uses models in `src/ts/models` to consume the API, the api url is set in `Model.ts`.

#### Sass

The Sass stylesheets are divides in three separate files: 

- `_base.scss` holds resets and basic style, colors, typography and overall layout. 
- ` _utilities.scss` holds variables, mixins and helper classes.
- `_modules.scss` holds style specific to different modules.

## Project with three parts

This website is part of a school assignment that has been developed in three separate parts. One REST API, one admin website with login to administrate it and a public website to read data from it.

These repositories holds the rest of the project:

- REST API: https://github.com/sofiewallin/cv-rest-api
- Admin website: https://github.com/sofiewallin/cv-admin