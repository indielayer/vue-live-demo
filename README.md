<a href="https://indielayer.com/">
  <img src="https://indielayer.com/logo.png" alt="Indielayer" width="300" />
</a>

> Building digital products and empowering online companies

<br/>

# Vue Live Demo - SFC Editor

[![npm (scoped with tag)](https://flat.badgen.net/npm/v/@indielayer/vue-live-demo)](https://npmjs.com/package/@indielayer/vue-live-demo)
[![npm](https://flat.badgen.net/npm/dt/@indielayer/vue-live-demo)](https://npmjs.com/package/@indielayer/vue-live-demo)

Vue Live Demo used on Indielayer

## Getting Started

Do you want to add to your own projects? There you go:

1. Add this package to your dependencies

```bash
$ npm i @indielayer/vue-live-demo
# or
$ yarn add @indielayer/vue-live-demo
```

2. Usage:

```html
<template>
  <div style="padding-top: 100px">

    <vue-live-demo
      :code="code"
      :show-code="showCode"
      :components="components"
    />

  </div>
</template>

<script>
import VueLiveDemo from '@indielayer/vue-live-demo'

// Components you wish to add on the demo
// import RandomComponent from './RandomComponent.vue'

export default {
  components: {
    VueLiveDemo
  },
  data() {
    return {
      // components you wish to add on the demo
      components: {
        // RandomComponent,
      },
      code: `<template><div>hello</div></template>`,
      showCode: true
    }
  }
}
</script>
```

### Missing features - TODO

- accept `style` blocks and inject them into the HTML
- `import` other scripts in the Single File Component


## License

[MIT license](https://github.com/indielayer/vue-live-demo/blob/master/LICENSE) - Indielayer
