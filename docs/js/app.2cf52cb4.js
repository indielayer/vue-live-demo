(function(e){function t(t){for(var o,a,c=t[0],p=t[1],s=t[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(o in p)Object.prototype.hasOwnProperty.call(p,o)&&(e[o]=p[o]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,c=1;c<n.length;c++){var p=n[c];0!==r[p]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={app:0},i=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/vue-live-demo/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],p=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var u=p;i.push(["8c94","chunk-vendors"]),n()})({"29e9":function(e,t,n){"use strict";var o=n("9963"),r=n.n(o);r.a},"3c93":function(module,__webpack_exports__,__webpack_require__){"use strict";var vue_template_compiler_browser__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("5ce8"),vue_template_compiler_browser__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(vue_template_compiler_browser__WEBPACK_IMPORTED_MODULE_0__);function _typeof(e){return _typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}__webpack_exports__["a"]={errorCaptured:function(e){this.handleError(e)},props:{code:{type:String,required:!0},components:{type:Object,default:function(){return{}}}},data:function(){return{scope:this.generateScope(),previewedComponent:void 0,iteration:0,error:!1}},watch:{code:function(e){this.renderComponent(e.trim())}},created:function(){this.renderComponent(this.code.trim())},methods:{generateScope:function(){return"v-xxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0,n="x"===e?t:3&t|8;return n.toString(16)}))},handleError:function(e){this.error=e.message},renderComponent:function renderComponent(code){var appComponent={};try{var parsed=Object(vue_template_compiler_browser__WEBPACK_IMPORTED_MODULE_0__["parseComponent"])(code);if(appComponent={template:parsed.template?parsed.template.content:code},parsed.script){var componentScript=eval("(function() { ".concat(parsed.script.content.replace("export default","return")," })")),componentProperties=componentScript();componentProperties&&componentProperties.data&&"object"!==_typeof(componentProperties.data())&&(componentProperties.data=void 0),appComponent=Object.assign({template:parsed.template.content},componentProperties)}var _compile=Object(vue_template_compiler_browser__WEBPACK_IMPORTED_MODULE_0__["compile"])(appComponent.template),render=_compile.render,staticRenderFns=_compile.staticRenderFns;appComponent.render=new Function(render),appComponent.staticRenderFns=staticRenderFns.map((function(e){return new Function(e)}))}catch(e){return void this.handleError(e)}appComponent.components=this.components,appComponent.template||appComponent.render?(this.previewedComponent=appComponent,this.iteration=this.iteration+1,this.error=!1):this.handleError({message:"No template or render function specified"})}}}},"74c6":function(e,t,n){},8524:function(e,t,n){},"8c94":function(e,t,n){"use strict";n.r(t);var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"wrapper"},[n("h1",[e._v("Vue Live Demo")]),n("p",[e._v("A component for live editing Vue single file components in the browser with real time preview.")]),n("a",{attrs:{href:"https://github.com/indielayer/vue-live-demo"}},[e._v("https://github.com/indielayer/vue-live-demo")]),n("vue-live-demo",{staticClass:"demo",attrs:{code:e.code,"show-code":e.showCode}})],1)])},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editor-layout"},[n("div",{staticClass:"editor-preview",class:{"editor-layout-col":e.showCode}},[n("vue-live-preview",{attrs:{code:e.previewCode,components:e.components}})],1),e.showCode?n("div",{staticClass:"editor-layout-col editor-code"},[n("vue-live-editor",{attrs:{code:e.previewCode},on:{change:function(t){return e.previewCode=t}}})],1):e._e()])},c=[],p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editor"},[n("div",{staticClass:"editor-actions"},[n("button",{staticClass:"btn-reset",on:{click:e.resetCode}},[e._v("Reset")]),n("button",{on:{click:e.copyCode}},[e._v(e._s(e.copyLabel))])]),n("textarea",{ref:"textarea"})])},s=[],u=n("56b3"),l=n.n(u),d=n("49e7"),m=(n("a7be"),n("7a7a"),n("31c5"),n("8c33"),n("693d"),n("b047")),f=n.n(m);Object(d["a"])(l.a);var _={props:{code:{type:String,default:""}},data:function(){return{editor:null,copyLabel:"Copy",originalCode:this.code}},mounted:function(){var e=this;this.editor=l.a.fromTextArea(this.$refs.textarea,{mode:"vue",theme:"monokai",value:"<template></template>",lineNumbers:!0,lineWrapping:!0,tabSize:2,autofocus:!1,line:!0,styleActiveLine:!0,matchBrackets:!0,extraKeys:{Tab:"emmetExpandAbbreviation",Enter:"emmetInsertLineBreak"}}),this.editor.on("change",f()((function(){e.$emit("change",e.editor.getValue())}),400)),this.editor.setValue(this.code)},methods:{copyCode:function(){var e=this,t=document.createElement("textarea");t.value=this.editor.getValue(),document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),this.copyLabel="Copied!",setTimeout((function(){e.copyLabel="Copy"}),3e3)},resetCode:function(){this.editor.setValue(this.originalCode),this.$emit("change",this.editor.getValue())}}},v=_,h=(n("c939"),n("29e9"),n("2877")),b=Object(h["a"])(v,p,s,!1,null,"0bc6ff90",null),y=b.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.error?n("pre",{class:e.$style.error},[e._v(e._s(e.error))]):e.previewedComponent?n(e.previewedComponent,{key:e.iteration,tag:"component",attrs:{id:e.scope}}):e._e()},w=[],g=n("3c93"),x=g["a"],O=n("ae13");function E(e){this["$style"]=O["default"].locals||O["default"]}var P=Object(h["a"])(x,C,w,!1,E,null,null),S=P.exports,j={components:{VueLiveEditor:y,VueLivePreview:S},props:{code:{type:String,default:""},showCode:{type:Boolean,default:!1},components:{type:Object,default:function(){return{}}}},data:function(){return{previewCode:this.code}}},L=j,k=(n("ea1e"),Object(h["a"])(L,a,c,!1,null,"ce415dbe",null)),M=k.exports,D="<template>\n  <div>\n    <h2>Preview - Groceries List</h2>\n    <ul>\n      <li v-for=\"(item, index) in list\" :key=\"index\">\n        {{ item }}\n      </li>\n    </ul>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      list: ['Apples', 'Fish', 'Oranges', 'Spaceships']\n    }\n  }\n}\n<\/script>",T=o["a"].extend({name:"ServeDev",components:{VueLiveDemo:M},data:function(){return{code:D,showCode:!0}}}),V=T,A=(n("cf01"),Object(h["a"])(V,r,i,!1,null,null,null)),R=A.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(R)}}).$mount("#app")},"8eca":function(e,t,n){},9963:function(e,t,n){},ae13:function(e,t,n){"use strict";var o=n("baf4"),r=n.n(o);t["default"]=r.a},baf4:function(e,t,n){e.exports={error:"VueLivePreview_error_fOY1Q"}},c939:function(e,t,n){"use strict";var o=n("74c6"),r=n.n(o);r.a},cf01:function(e,t,n){"use strict";var o=n("8524"),r=n.n(o);r.a},ea1e:function(e,t,n){"use strict";var o=n("8eca"),r=n.n(o);r.a}});
//# sourceMappingURL=app.2cf52cb4.js.map