# <a href="https://react.dev/" rel="nofollow"><img alt="React" src="https://ghiscoding.github.io/slickgrid-react-demos/assets/react-logo-DuD1bc7a.png" width="70"></a> Slickgrid-React Demos
## Multiple Demos of the [Slickgrid-React](https://github.com/ghiscoding/slickgrid-universal/tree/master/frameworks/slickgrid-react) library

### Installation
Git clone the demo and npm install it, then run and enjoy fully working demo.

### Bootstrap 5 - with `i18n` Translate

Common Bootstrap 5 demo using `i18n` to provide the use of multiple languages (locales) which can be switched dynamically (on the fly).

```sh
git clone https://github.com/ghiscoding/slickgrid-react-demos
cd with-i18n-translate
npm install
```

##### Build Demo
```bash
npm run build # OR yarn run build
```

### Bootstrap 5 - with Custom Locales (single locale)

> This folder purposely has less examples compared to the project with `i18n`

This is the same as the Bootstrap 5 demo except that it uses custom Locale(s) and does not require (neither use) `i18n` and are with fixed Locale(s) (this means it is a single static locale loaded). The Locales that were added for the demo (English/French), can be found under [src/app/locales](/single-locale-without-i18n/src/examples/slickgrid/locales). You can use, and define, your own custom Locales via a TypeScript file.

```sh
git clone https://github.com/ghiscoding/slickgrid-react-demos
cd single-locale-without-i18n
npm install
```

##### Build Demo
```bash
npm run build # OR yarn run build
```

#### VScode
If you use Visual Studio Code, you can also run each of the demo through the multiple VSCode Tasks.

### Optional NPM Packages
Please note that some of the npm packages installed in these demos are **optional** and are installed **only** for demo purposes. If you don't need the feature then don't install it (remove it from your `package.json`) and you'll end up with a smaller production build.

Again the following dependencies are totally **OPTIONAL**

| Package Name | Version | Description |
| ------------ | ------- | ----------- |
| [@slickgrid-universal/composite-editor-component](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages/composite-editor-component) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/composite-editor-component.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/composite-editor-component) | Composite Editor Modal Component |
| [@slickgrid-universal/custom-tooltip-plugin](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages/custom-tooltip-plugin) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/custom-tooltip-plugin.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/custom-tooltip-plugin) | Custom Tooltip Plugin |
| [@slickgrid-universal/excel-export](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages/excel-export) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/excel-export.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/excel-export) | Export to Excel Service (xls/xlsx) |
| [@slickgrid-universal/text-export](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages/text-export) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/text-export.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/text-export) | Export to Text File Service (csv/txt) |
| [@slickgrid-universal/graphql](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages/graphql) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/graphql.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/graphql) | GraphQL Query Service (support Filter/Sort/Pagination) |
| [@slickgrid-universal/odata](https://github.com/ghiscoding/slickgrid-universal/tree/master/packages/odata) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/odata.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/odata) | OData Query Service (support Filter/Sort/Pagination) |
| [@slickgrid-universal/react-row-detail-plugin](https://github.com/ghiscoding/slickgrid-universal/tree/master/frameworks-plugins/react-row-detail-plugin) | [![npm](https://img.shields.io/npm/v/@slickgrid-universal/react-row-detail-plugin.svg?color=forest)](https://www.npmjs.com/package/@slickgrid-universal/react-row-detail-plugin) | Slickgrid-React Row Detail plugin |