'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var CodeMirror=_interopDefault(require('codemirror')),emmet=_interopDefault(require('@emmetio/codemirror-plugin'));require('codemirror/lib/codemirror.css'),require('codemirror/theme/monokai.css'),require('codemirror/addon/selection/active-line'),require('codemirror/addon/edit/matchbrackets'),require('codemirror/mode/vue/vue');var debounce=_interopDefault(require('lodash/debounce')),browser=require('vue-template-compiler/browser');//
emmet(CodeMirror);
var script = {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      editor: null,
      copyLabel: 'Copy',
      originalCode: this.code
    };
  },
  mounted: function mounted() {
    var _this = this;

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
    this.editor.on('change', debounce(function () {
      _this.$emit('change', _this.editor.getValue());
    }, 400));
    this.editor.setValue(this.code);
  },
  methods: {
    copyCode: function copyCode() {
      var _this2 = this;

      var el = document.createElement('textarea');
      el.value = this.editor.getValue();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copyLabel = 'Copied!';
      setTimeout(function () {
        _this2.copyLabel = 'Copy';
      }, 3000);
    },
    resetCode: function resetCode() {
      this.editor.setValue(this.originalCode);
      this.$emit('change', this.editor.getValue());
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "editor"
  }, [_vm._ssrNode("<div class=\"editor-actions\" data-v-754b1f23><button class=\"btn-reset\" data-v-754b1f23>Reset</button> <button data-v-754b1f23>" + _vm._ssrEscape(_vm._s(_vm.copyLabel)) + "</button></div> <textarea data-v-754b1f23></textarea>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
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


var __vue_scope_id__ = "data-v-754b1f23";
/* module identifier */

var __vue_module_identifier__ = "data-v-754b1f23";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}var script$1 = {
  errorCaptured: function errorCaptured(err) {
    this.handleError(err);
  },
  props: {
    code: {
      type: String,
      required: true
    },
    components: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      scope: this.generateScope(),
      previewedComponent: undefined,
      iteration: 0,
      error: false
    };
  },
  watch: {
    code: function code(value) {
      this.renderComponent(value.trim());
    }
  },
  created: function created() {
    this.renderComponent(this.code.trim());
  },
  methods: {
    generateScope: function generateScope() {
      return 'v-xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    },
    handleError: function handleError(e) {
      this.error = e.message;
    },
    renderComponent: function renderComponent(code) {
      var appComponent = {};

      try {
        var parsed = browser.parseComponent(code);
        appComponent = {
          template: parsed.template ? parsed.template.content : code
        };

        if (parsed.script) {
          // eslint-disable-next-line no-eval
          var componentScript = eval("(function() { ".concat(parsed.script.content.replace('export default', 'return'), " })")); // const componentScript = new Function(parsed.script.content.replace('export default', 'return'))

          var componentProperties = componentScript(); // check data() for return object

          if (componentProperties && componentProperties.data && _typeof(componentProperties.data()) !== 'object') componentProperties.data = undefined;
          appComponent = Object.assign({
            template: parsed.template.content
          }, componentProperties);
        }

        var _compile = browser.compile(appComponent.template),
            render = _compile.render,
            staticRenderFns = _compile.staticRenderFns; // eslint-disable-next-line no-new-func


        appComponent.render = new Function(render); // eslint-disable-next-line no-new-func

        appComponent.staticRenderFns = staticRenderFns.map(function (s) {
          return new Function(s);
        });
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
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.error ? _c('pre', {
    class: _vm.$style.error
  }, [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.error)))], 2) : _vm.previewedComponent ? _c(_vm.previewedComponent, {
    key: _vm.iteration,
    tag: "component",
    attrs: {
      "id": _vm.scope
    }
  }) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
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


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-2df59276";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
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
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      previewCode: this.code
    };
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "editor-layout"
  }, [_vm._ssrNode("<div" + _vm._ssrClass("editor-preview", {
    'editor-layout-col': _vm.showCode
  }) + " data-v-6154bfcc>", "</div>", [_c('vue-live-preview', {
    attrs: {
      "code": _vm.previewCode,
      "components": _vm.components
    }
  })], 1), _vm._ssrNode(" "), _vm.showCode ? _vm._ssrNode("<div class=\"editor-layout-col editor-code\" data-v-6154bfcc>", "</div>", [_c('vue-live-editor', {
    attrs: {
      "code": _vm.previewCode
    },
    on: {
      "change": function change(c) {
        return _vm.previewCode = c;
      }
    }
  })], 1) : _vm._e()], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6154bfcc_0", {
    source: ".editor-layout[data-v-6154bfcc]{display:flex;width:100%;min-width:0;max-width:100%;flex-direction:column}.editor-preview[data-v-6154bfcc]{width:100%;max-width:100%}.editor-code[data-v-6154bfcc]{margin-top:42px;display:flex}@media (min-width:960px){.editor-layout[data-v-6154bfcc]{flex-direction:row}.editor-layout-col[data-v-6154bfcc]{width:50%;max-width:50%}.editor-code[data-v-6154bfcc]{margin-top:0;margin-left:14px;margin-right:2px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = "data-v-6154bfcc";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-6154bfcc";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueLiveDemo(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueLiveDemo', __vue_component__$2);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$2.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$2;