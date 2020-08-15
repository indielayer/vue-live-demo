import CodeMirror from 'codemirror';
import emmet from '@emmetio/codemirror-plugin';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/vue/vue';
import debounce from 'lodash/debounce';
import { parseComponent, compile } from 'vue-template-compiler/browser';

//
emmet(CodeMirror);
var script = {
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
    };
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
    });
    this.editor.on('change', debounce(() => {
      this.$emit('change', this.editor.getValue());
    }, 400));
    this.editor.setValue(this.code);
  },

  methods: {
    copyCode() {
      const el = document.createElement('textarea');
      el.value = this.editor.getValue();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copyLabel = 'Copied!';
      setTimeout(() => {
        this.copyLabel = 'Copy';
      }, 3000);
    },

    resetCode() {
      this.editor.setValue(this.originalCode);
      this.$emit('change', this.editor.getValue());
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "editor"
  }, [_c('div', {
    staticClass: "editor-actions"
  }, [_c('button', {
    staticClass: "btn-reset",
    on: {
      "click": _vm.resetCode
    }
  }, [_vm._v("Reset")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.copyCode
    }
  }, [_vm._v(_vm._s(_vm.copyLabel))])]), _vm._v(" "), _c('textarea', {
    ref: "textarea"
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-754b1f23_0", {
    source: ".CodeMirror{font-family:Consolas,Monaco,\"Andale Mono\",\"Ubuntu Mono\",monospace;font-size:.875rem;font-weight:700;border-radius:6px;background-color:#101c23;flex:1}.CodeMirror-gutters{background-color:#101c23}.CodeMirror-activeline-background{background-color:#050a0d}.CodeMirror-scroll{padding:8px}",
    map: undefined,
    media: undefined
  }), inject("data-v-754b1f23_1", {
    source: ".editor[data-v-754b1f23]{position:relative;border-radius:6px;width:100%;display:flex;flex-direction:column}.editor-actions[data-v-754b1f23]{position:absolute;top:-34px;right:0}button[data-v-754b1f23]{text-transform:none;color:#fff;cursor:pointer;border-style:none;height:44px;min-width:78px;padding:0 20px;transition:all .2s;font-size:.875rem;font-weight:700;border-radius:6px;background-color:#282824;margin-left:8px}button[data-v-754b1f23]:focus{outline:0}button[data-v-754b1f23]:hover{transform:translateY(-14px)}button[data-v-754b1f23]:active{transform:translateY(-24px)}.btn-reset[data-v-754b1f23]{background-color:#4a4a45}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-754b1f23";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
var script$1 = {
  errorCaptured(err) {
    this.handleError(err);
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
    };
  },

  watch: {
    code(value) {
      this.renderComponent(value.trim());
    }

  },

  created() {
    this.renderComponent(this.code.trim());
  },

  methods: {
    generateScope() {
      return 'v-xxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    },

    handleError(e) {
      this.error = e.message;
    },

    renderComponent(code) {
      let appComponent = {};

      try {
        const parsed = parseComponent(code);
        appComponent = {
          template: parsed.template ? parsed.template.content : code
        };

        if (parsed.script) {
          // eslint-disable-next-line no-eval
          const componentScript = eval(`(function() { ${parsed.script.content.replace('export default', 'return')} })`); // const componentScript = new Function(parsed.script.content.replace('export default', 'return'))

          const componentProperties = componentScript(); // check data() for return object

          if (componentProperties && componentProperties.data && typeof componentProperties.data() !== 'object') componentProperties.data = undefined;
          appComponent = Object.assign({
            template: parsed.template.content
          }, componentProperties);
        }

        const {
          render,
          staticRenderFns
        } = compile(appComponent.template); // eslint-disable-next-line no-new-func

        appComponent.render = new Function(render); // eslint-disable-next-line no-new-func

        appComponent.staticRenderFns = staticRenderFns.map(s => new Function(s));
      } catch (e) {
        this.handleError(e);
        return;
      }

      appComponent.components = this.components;

      if (appComponent.template || appComponent.render) {
        this.previewedComponent = appComponent;
        this.iteration = this.iteration + 1;
        this.error = false;
      } else {
        this.handleError({
          message: 'No template or render function specified'
        });
      }
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.error ? _c('pre', {
    class: _vm.$style.error
  }, [_vm._v(_vm._s(_vm.error))]) : _vm.previewedComponent ? _c(_vm.previewedComponent, {
    key: _vm.iteration,
    tag: "component",
    attrs: {
      "id": _vm.scope
    }
  }) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-2df59276_0", {
    source: ".src-error-fOY1{font-family:Consolas,Monaco,\"Andale Mono\",\"Ubuntu Mono\",monospace;font-size:.875rem;color:red;text-align:left;font-weight:700;overflow:auto;white-space:pre-wrap}",
    map: undefined,
    media: undefined
  });
  Object.defineProperty(this, "$style", {
    value: {
      "error": "src-error-fOY1"
    }
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
var script$2 = {
  components: {
    VueLiveEditor: __vue_component__,
    VueLivePreview: __vue_component__$1
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
    };
  }

};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "editor-layout"
  }, [_c('div', {
    staticClass: "editor-preview",
    class: {
      'editor-layout-col': _vm.showCode
    }
  }, [_c('vue-live-preview', {
    attrs: {
      "code": _vm.previewCode,
      "components": _vm.components
    }
  })], 1), _vm._v(" "), _vm.showCode ? _c('div', {
    staticClass: "editor-layout-col editor-code"
  }, [_c('vue-live-editor', {
    attrs: {
      "code": _vm.previewCode
    },
    on: {
      "change": function (c) {
        return _vm.previewCode = c;
      }
    }
  })], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-6154bfcc_0", {
    source: ".editor-layout[data-v-6154bfcc]{display:flex;width:100%;min-width:0;max-width:100%;flex-direction:column}.editor-preview[data-v-6154bfcc]{width:100%;max-width:100%}.editor-code[data-v-6154bfcc]{margin-top:42px;display:flex}@media (min-width:960px){.editor-layout[data-v-6154bfcc]{flex-direction:row}.editor-layout-col[data-v-6154bfcc]{width:50%;max-width:50%}.editor-code[data-v-6154bfcc]{margin-top:0;margin-left:14px;margin-right:2px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-6154bfcc";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueLiveDemo(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueLiveDemo', __vue_component__$2);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$2.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$2;
