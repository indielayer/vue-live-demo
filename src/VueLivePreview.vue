<template>
  <pre v-if="error" :class="$style.error">{{ error }}</pre>
  <component
    :is="previewedComponent"
    v-else-if="previewedComponent"
    :key="iteration"
    :class="scope"
  />
</template>

<script>
import { parseComponent, compile } from 'vue-template-compiler/browser'

export default {
  errorCaptured(err) {
    this.handleError(err)
  },
  props: {
    code: {
      type: String,
      required: true
    },
    components: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      scope: this.generateScope(),
      previewedComponent: undefined,
      iteration: 0,
      error: false
    }
  },
  watch: {
    code(value) {
      this.renderComponent(value.trim())
    }
  },
  created() {
    this.renderComponent(this.code.trim())
  },
  methods: {
    generateScope() {
      return 'v-xxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8

        return v.toString(16)
      })
    },
    scopeStyle (style) {
      return style.trim().replace(/(^|\})\s*([^{]+)/g, (m, g1, g2) => {
        return g1 ? `${g1} .${this.scope} ${g2}` : `.${this.scope} ${g2}`
      })
    },
    handleError(e) {
      this.error = e.message
    },
    renderComponent(code) {
      let appComponent = {}

      try {
        const parsed = parseComponent(code)

        appComponent = {
          template: parsed.template ? parsed.template.content : code
        }

        if (parsed.script) {
          let { content } = parsed.script

          // ignore all imports
          content = content.replace(/^import.*$/m, '')

          // ignore components property
          content = content.replace(/components:\s?{[\s\S]*?},?/, '')

          // eslint-disable-next-line no-eval
          const componentScript = eval(`(function() { ${content.replace('export default', 'return')} })`)
          // const componentScript = new Function(parsed.script.content.replace('export default', 'return'))

          const componentProperties = componentScript()

          // check data() for return object
          if (componentProperties && componentProperties.data && typeof componentProperties.data() !== 'object') componentProperties.data = undefined

          appComponent = Object.assign({ template: parsed.template.content }, componentProperties)
        }

        if (parsed.styles && parsed.styles.length > 0) {
          const styles = parsed.styles.map((s) => s.content).join(' ')

          if (!this.elStyle) {
            const head = document.head || document.getElementsByTagName('head')[0]

            this.elStyle = document.createElement('style')
            this.elStyle.type = 'text/css'
            head.appendChild(this.elStyle)
          }

          this.elStyle.innerHTML = this.scopeStyle(styles)
        }

        const { render, staticRenderFns } = compile(appComponent.template)

        // eslint-disable-next-line no-new-func
        appComponent.render = new Function(render)
        // eslint-disable-next-line no-new-func
        appComponent.staticRenderFns = staticRenderFns.map((s) => new Function(s))
      } catch (e) {
        this.handleError(e)

        return
      }

      appComponent.components = this.components

      if (appComponent.template || appComponent.render) {
        this.previewedComponent = appComponent
        this.iteration = this.iteration + 1
        this.error = false
      } else {
        this.handleError({
          message: 'No template or render function specified'
        })
      }
    }
  }
}
</script>

<style module>
.error {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  color: red;
  text-align: left;
  font-weight: bold;
  overflow: auto;
  white-space: pre-wrap;
}
</style>
