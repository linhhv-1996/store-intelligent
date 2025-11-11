import { _ as __nuxt_component_0 } from './nuxt-link-DUFRID80.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './v3-BThM1qj6.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'hpagent';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "privacy",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Privacy Policy - store sniffer"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[60rem] mx-auto px-4 py-8 space-y-6" }, _attrs))}><div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4"><h1 class="text-2xl font-bold text-slate-900 font-tech uppercase tracking-wider"> Privacy Policy </h1><div class="text-sm text-slate-700 space-y-3"><p class="text-xs text-slate-500">Last updated: November 7, 2025</p><p> We respect your privacy. This policy explains what information we (do not) collect when you use this tool. </p><h2 class="text-lg font-semibold text-slate-800 pt-3"> 1. Information We Do Not Collect </h2><ul class="list-disc list-outside pl-5 space-y-1"><li> We do not collect any personal identifiable information (PII) such as your name, email address, or phone number. </li><li>We do not use cookies for tracking or user sessions.</li><li> We do not store your search queries, app IDs, or the results of your lookups. </li></ul><h2 class="text-lg font-semibold text-slate-800 pt-3"> 2. Server Logs </h2><ul class="list-disc list-outside pl-5 space-y-1"><li> Our web server may automatically log standard information, such as your IP address, browser type, and the time of your request. </li><li> This information is used solely for the purpose of monitoring server performance, diagnosing technical issues, and ensuring security. It is not shared with any third parties and is deleted regularly. </li></ul><h2 class="text-lg font-semibold text-slate-800 pt-3"> 3. Third-Party Data </h2><ul class="list-disc list-outside pl-5 space-y-1"><li> This tool interacts with Apple and Google APIs to fetch public app data. We do not control and are not responsible for the privacy practices of these third parties. </li></ul><p class="pt-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-sky-600 font-medium hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u2190 Back to the tool`);
          } else {
            return [
              createTextVNode("\u2190 Back to the tool")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-BwKxM7b9.mjs.map
