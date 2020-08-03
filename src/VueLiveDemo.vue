<template>
  <div class="editor-layout">
    <div class="editor-preview" :class="{ 'editor-layout-col': showCode }">
      <vue-live-preview :code="previewCode" :components="components" />
    </div>
    <div v-if="showCode" class="editor-layout-col editor-code">
      <vue-live-editor :code="previewCode" @change="(c) => previewCode = c" />
    </div>
  </div>
</template>

<script>
import VueLiveEditor from '@/VueLiveEditor'
import VueLivePreview from '@/VueLivePreview'

export default {
  components: {
    VueLiveEditor,
    VueLivePreview
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    showCode: {
      type: Boolean,
      default: false
    },
    components: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      previewCode: this.code
    }
  }
}
</script>

<style scoped>
.editor-layout {
  display: flex;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  flex-direction: column;
}

.editor-preview {
  width: 100%;
  max-width: 100%;
}

.editor-code {
  margin-top: 42px;
  display: flex;
}

@media (min-width: 960px) {
  .editor-layout {
    flex-direction: row;
  }

  .editor-layout-col {
    width: 50%;
    max-width: 50%;
  }

  .editor-code {
    margin-top: 0;
    margin-left: 14px;
    margin-right: 2px;
  }
}
</style>
