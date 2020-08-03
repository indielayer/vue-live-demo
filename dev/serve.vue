<script>
import Vue from 'vue';
import VueLiveDemo from '@/VueLiveDemo.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueLiveDemo
  },
  data() {
    return {
      code: '<template><div>hello</div></template>',
      showCode: true
    }
  }
});
</script>

<template>
  <div id="app">
    <div class="wrapper">
      <vue-live-demo :code="code" :show-code="showCode" />
    </div>
  </div>
</template>

<style>
.wrapper {
  padding-top: 100px;
}
</style>
