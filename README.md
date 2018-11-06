## Introduction

> vuepress-theme-vuescroll is a [`vuepress`](https://github.com/vuejs/vuepress) theme `plugin` that allow you customize scrollbars by [`vuescroll`](https://github.com/YvesCoding/vuescroll) in Vuepress.

## Who use this plugin ?

- [vuescroll offical website](http://vuescrolljs.yvescoding.org/)

- More... Welcome to tell me !

## Usage

1. Installation

```bash
  npm i vuepress-theme-vuescroll -S
```

2. Config.js

To use a theme from an npm dependency, provide a theme option in .vuepress/config.js:

```javascript
module.exports = {
  theme: 'vuescroll'
};
```

3. Create an `enhanceApp.js` in your `.vuepress` folder and write such code:

```javascript
// enhanceApp.js

import { registry } from 'vuepress-theme-vuescroll';

export default ({ Vue, router, store }) => {
  // Your  options of most outside vuescroll.
  let ops = {
    bar: {
      background: '#3eaf7c'
    },
    rail: {
      gutterOfEnds: '60px'
    },
    scrollPanel: {
      scrollingX: false
    }
  };
  // THe version you would like to use.
  // default: vuescroll(mix)
  // options: slide, native
  const mode = 'native';
  // Tell vuescroll your option.
  registry(ops, mode);
};
```

4. That's all, you can use vuescroll in your own App!

## Current Vuepress Version

### 0.14.2

## License

### MIT
