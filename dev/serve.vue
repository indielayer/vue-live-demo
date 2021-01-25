<script>
import Vue from 'vue'
import VueLiveDemo from '@/VueLiveDemo.vue'
import DemoSnippet from '!!raw-loader!./demo.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueLiveDemo
  },
  data() {
    return {
      code: DemoSnippet,
      showCode: true
    }
  }
})
</script>

<template>
  <div id="app">
    <div class="wrapper">
      <h1>Vue Live Demo</h1>
      <p>A component for live editing Vue single file components in the browser with real time preview.</p>
      <a href="https://github.com/indielayer/vue-live-demo">https://github.com/indielayer/vue-live-demo</a>

      <vue-live-demo class="demo" :code="code" :show-code="showCode" />
    </div>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.wrapper {
  max-width: 1200px;
  margin: auto;
}

.demo {
  margin-top: 100px;
}

.CodeMirror {
  height: 500px;
}
</style>
