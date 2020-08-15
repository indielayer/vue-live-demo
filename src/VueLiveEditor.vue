<template>
  <div class="editor">
    <div class="editor-actions">
      <button class="btn-reset" @click="resetCode">Reset</button>
      <button @click="copyCode">{{ copyLabel }}</button>
    </div>
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import emmet from '@emmetio/codemirror-plugin'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/mode/vue/vue'
import debounce from 'lodash/debounce'

emmet(CodeMirror)

export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      copyLabel: 'Copy',
      originalCode: this.code
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      mode: 'vue',
      theme: 'monokai',
      value: '<template></template>',
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      autofocus: false,
      line: true,
      styleActiveLine: true,
      matchBrackets: true,
      extraKeys: {
        Tab: 'emmetExpandAbbreviation',
        Enter: 'emmetInsertLineBreak'
      }
    })

    this.editor.on('change',
      debounce(() => {
        this.$emit('change', this.editor.getValue())
      }, 400)
    )

    this.editor.setValue(this.code)
  },
  methods: {
    copyCode() {
      const el = document.createElement('textarea')

      el.value = this.editor.getValue()
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      this.copyLabel = 'Copied!'

      setTimeout(() => {
        this.copyLabel = 'Copy'
      }, 3000)
    },
    resetCode() {
      this.editor.setValue(this.originalCode)
      this.$emit('change', this.editor.getValue())
    }
  }
}
</script>

<style>
.CodeMirror {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  font-weight: bold;
  border-radius: 6px;
  background-color: #101c23;
  flex: 1;
}

.CodeMirror-gutters {
  background-color: #101c23;
}

.CodeMirror-activeline-background {
  background-color: #050a0d;
}

.CodeMirror-scroll {
  padding: 8px;
}
</style>

<style scoped>
.editor {
  position: relative;
  border-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.editor-actions {
  position: absolute;
  top: -34px;
  right: 0;
}

button {
  text-transform: none;
  color: #fff;
  cursor: pointer;
  border-style: none;
  height: 44px;
  min-width: 78px;
  padding: 0 20px;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: bold;
  border-radius: 6px;
  background-color: #282824;
  margin-left: 8px;
}

button:focus {
  outline: none;
}

button:hover {
  transform: translateY(-14px);
}

button:active {
  transform: translateY(-24px);
}

.btn-reset {
  background-color: #4a4a45;
}
</style>
