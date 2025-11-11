import { defineComponent, ref, computed, mergeProps, unref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-white border border-slate-200 rounded-2xl p-6 shadow-[3px_3px_0_rgba(15,23,42,0.12)] space-y-4" }, _attrs))}><h2 class="text-lg font-semibold text-slate-900"> About the store sniffer Tool </h2><div class="text-sm text-slate-700 space-y-3"><p><strong>store sniffer</strong> is an internal tool designed to quickly look up and analyze the performance of any application on the <strong>Apple App Store</strong> and <strong>Google Play Store</strong>. This tool provides a comprehensive overview of key metrics, metadata, and user feedback, helping you make better-informed decisions. </p><h3 class="text-base font-semibold text-slate-800 pt-2"> Key Features </h3><ul class="list-disc list-outside pl-5 space-y-1"><li><strong>App Lookup:</strong> Easily view detailed information using an App ID (like <code>com.facebook.Facebook</code>) or a numeric ID (for the App Store). Instantly fetch data on ratings, review counts, metadata (description, release notes, version, size), OS requirements, and developer details. </li><li><strong>Keyword Search:</strong> Analyze the market or find competitors by searching for apps related to specific keywords across different countries (US, UK, CAN, DE, JP, VN...). </li><li><strong>Review Analysis:</strong> View the latest user reviews for any app, filtering by country to understand user feedback and common issues. </li></ul><p> This tool utilizes <code>app-store-scraper</code> and <code>google-play-scraper</code> to fetch the latest public data directly from the app stores. </p></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/About.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const AppCountries = {
  "United States": "us",
  "United Kingdom": "gb",
  "Germany": "de",
  "France": "fr",
  "Canada": "ca",
  "Australia": "au",
  "South Korea": "kr",
  "Brazil": "br",
  "Vietnam": "vn",
  "Japan": "jp",
  "India": "in",
  "Russia": "ru",
  "Spain": "es",
  "Italy": "it",
  "Mexico": "mx",
  "Indonesia": "id",
  "Turkey": "tr",
  "Singapore": "sg"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReviewsModal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    appId: {},
    id: {},
    store: {},
    initialCountry: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selectedCountry = ref(props.initialCountry);
    const reviews = ref([]);
    const loading = ref(false);
    const loadingMore = ref(false);
    const error = ref("");
    const allReviewsLoaded = ref(false);
    const currentPage = ref(1);
    const nextPageToken = ref(null);
    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          selectedCountry.value = props.initialCountry;
          fetchInitialReviews();
        }
      }
    );
    watch(selectedCountry, () => {
      fetchInitialReviews();
    });
    const fetchReviewsData = async (isLoadMore = false) => {
      if (!props.appId && !props.id) {
        error.value = "Missing App ID";
        return;
      }
      if (!isLoadMore) {
        loading.value = true;
        reviews.value = [];
        allReviewsLoaded.value = false;
        currentPage.value = 1;
        nextPageToken.value = null;
      } else {
        loadingMore.value = true;
      }
      error.value = "";
      try {
        const params = {
          appId: props.appId,
          id: props.id,
          country: selectedCountry.value,
          store: props.store
        };
        let tokenSent = null;
        if (props.store === "google") {
          if (isLoadMore && nextPageToken.value) {
            params.token = nextPageToken.value;
            tokenSent = nextPageToken.value;
          }
        } else {
          params.page = String(currentPage.value);
        }
        const data = await $fetch("/api/reviews", { params });
        if (data.error) {
          throw new Error(data.error);
        }
        const newReviews = data.reviews || [];
        if (isLoadMore) {
          reviews.value.push(...newReviews);
        } else {
          reviews.value = newReviews;
        }
        if (newReviews.length === 0) {
          allReviewsLoaded.value = true;
          return;
        }
        if (props.store === "google") {
          const newNextToken = data.nextPageToken || null;
          if (!newNextToken || isLoadMore && newNextToken === tokenSent) {
            allReviewsLoaded.value = true;
          } else {
            nextPageToken.value = newNextToken;
          }
        } else {
          currentPage.value += 1;
        }
      } catch (e) {
        error.value = e.message || "Cannot load reviews";
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    };
    const fetchInitialReviews = () => {
      fetchReviewsData(false);
    };
    const ratingStars = (score) => {
      const num = Math.round(Number(score) || 0);
      const s = Math.min(Math.max(num, 0), 5);
      return "\u2605".repeat(s) + "\u2606".repeat(5 - s);
    };
    const platformName = computed(() => {
      return props.store === "apple" ? "App Store" : "Google Play";
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm" }, _attrs))}><div class="w-full max-w-2xl max-h-[80vh] bg-white rounded-2xl border border-slate-900/20 shadow-[3px_3px_0_rgba(15,23,42,0.18)] flex flex-col overflow-hidden"><div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/80"><div class="flex-1"><p class="text-sm font-semibold text-slate-900 flex items-center gap-2"><span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 border border-amber-200 text-[11px]"> \u2605 </span> Recent reviews </p><p class="text-[11px] text-slate-500 mt-0.5"> Latest user feedback from ${ssrInterpolate(platformName.value)}</p></div><div class="flex items-center gap-3"><select class="rounded-full bg-white border border-slate-300 px-2.5 py-1.5 text-[11px] focus:outline-none focus:ring-2 focus:ring-slate-900/40 focus:border-slate-900/50 disabled:opacity-60"${ssrIncludeBooleanAttr(loading.value || loadingMore.value) ? " disabled" : ""}><!--[-->`);
        ssrRenderList("AppCountries" in _ctx ? _ctx.AppCountries : unref(AppCountries), (code, name) => {
          _push(`<option${ssrRenderAttr("value", code)}${ssrIncludeBooleanAttr(Array.isArray(selectedCountry.value) ? ssrLooseContain(selectedCountry.value, code) : ssrLooseEqual(selectedCountry.value, code)) ? " selected" : ""}>${ssrInterpolate(name)} (${ssrInterpolate(code.toUpperCase())}) </option>`);
        });
        _push(`<!--]--></select><button type="button" class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"> Close </button></div></div><div class="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs bg-white">`);
        if (loading.value) {
          _push(`<p class="text-slate-500 text-center py-8"> Loading reviews... </p>`);
        } else if (error.value) {
          _push(`<p class="text-red-600 text-xs border border-red-100 bg-red-50/80 rounded-xl px-3 py-2.5"><span class="font-semibold">Error:</span> ${ssrInterpolate(error.value)}</p>`);
        } else if (!reviews.value.length) {
          _push(`<p class="text-slate-500 text-center py-8"> No reviews found for ${ssrInterpolate(selectedCountry.value.toUpperCase())}. </p>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(reviews.value, (rev, index) => {
            _push(`<div class="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5"><div class="flex items-start justify-between gap-2"><div><p class="text-[11px] font-semibold text-slate-900">${ssrInterpolate(rev.userName || "Anonymous")}</p><p class="text-[10px] text-amber-500/90">${ssrInterpolate(ratingStars(rev.score))} <span class="text-[10px] text-slate-500"> (${ssrInterpolate(rev.score)}/5) </span></p></div><p class="text-[10px] text-slate-400 text-right">${ssrInterpolate(rev.date || "")}<br>`);
            if (rev.version) {
              _push(`<span class="text-[10px]"> v${ssrInterpolate(rev.version)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</p></div>`);
            if (rev.title) {
              _push(`<p class="mt-1 text-[11px] font-medium text-slate-900">${ssrInterpolate(rev.title)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<p class="mt-0.5 text-[11px] text-slate-700 whitespace-pre-line">${ssrInterpolate(rev.text)}</p>`);
            if (rev.url) {
              _push(`<a${ssrRenderAttr("href", rev.url)} target="_blank" class="mt-1 inline-flex text-[10px] text-sky-600 hover:text-sky-500"> View on ${ssrInterpolate(platformName.value)} \u2192 </a>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
        if (!loading.value && !error.value && reviews.value.length > 0) {
          _push(`<div class="px-4 py-2.5 border-t border-slate-200 bg-slate-50/80 text-center">`);
          if (!allReviewsLoaded.value) {
            _push(`<button type="button"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} class="inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-[11px] font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-60 disabled:cursor-wait">${ssrInterpolate(loadingMore.value ? "Loading..." : "Load more reviews")}</button>`);
          } else {
            _push(`<p class="text-[11px] text-slate-400"> All reviews loaded. </p>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReviewsModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedStore = ref("apple");
    const activeTab = ref("lookup");
    const appId = ref("");
    const country = ref("us");
    const appResult = ref(null);
    const appError = ref("");
    const appLoading = ref(false);
    const searchTerm = ref("");
    const searchCountry = ref("us");
    const searchResults = ref([]);
    const searchError = ref("");
    const searchLoading = ref(false);
    const difficultyScore = ref(null);
    const difficultyLoading = ref(false);
    const difficultyError = ref("");
    const showReviewsModal = ref(false);
    const lookupIdLabel = computed(() => {
      return selectedStore.value === "apple" ? "appId or numeric App Store ID" : "Google Play App ID";
    });
    const lookupPlaceholder = computed(() => {
      return selectedStore.value === "apple" ? "com.your.app or 1234567890" : "com.google.android.apps.maps";
    });
    const lookupExample = computed(() => {
      return selectedStore.value === "apple" ? "com.facebook.Facebook or 284882215" : "com.google.android.apps.maps";
    });
    const platformName = computed(() => {
      return selectedStore.value === "apple" ? "App Store" : "Google Play";
    });
    const requiredOsLabel = computed(() => {
      return selectedStore.value === "apple" ? "Required iOS" : "Required Android";
    });
    const prettySize = (raw) => {
      if (!raw) return "\u2014";
      if (typeof raw === "string" && (raw.endsWith("M") || raw.endsWith("G") || raw.endsWith("k"))) {
        return raw;
      }
      const num = typeof raw === "string" ? parseInt(raw, 10) : Number(raw);
      if (!num || Number.isNaN(num)) return "\u2014";
      const mb = num / (1024 * 1024);
      if (mb < 1) return num.toLocaleString() + " B";
      return mb.toFixed(1) + " MB";
    };
    const joinLanguages = (langs) => {
      if (!langs || !langs.length) return "\u2014";
      if (langs.length <= 3) return langs.join(", ");
      return langs.slice(0, 3).join(", ") + ` +${langs.length - 3}`;
    };
    const formatNumber = (n) => {
      if (n === null || n === void 0 || Number.isNaN(n)) return "0";
      return n.toLocaleString();
    };
    const formatCompactNumber = (n) => {
      if (n === null || n === void 0 || Number.isNaN(n) || n === 0) return "0";
      try {
        const num = new Intl.NumberFormat("en-US", {
          notation: "compact",
          compactDisplay: "short",
          maximumFractionDigits: 1
        }).format(n);
        return num.replace(/\.0(?=[KMGTB])/, "");
      } catch (e) {
        if (n < 1e6) return (n / 1e3).toFixed(0) + "K";
        return (n / 1e6).toFixed(1) + "M";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_About = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 text-slate-900" }, _attrs))}><div class="max-w-5xl mx-auto px-4 py-8 space-y-6"><div class="px-2 text-center"><h1 class="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900"> Quick performance &amp; meta check for any app </h1><p class="mt-1 text-sm text-slate-600 max-w-lg mx-auto"> Simple spy tool for your app studio \u2013 App Store &amp; Google Play in one place. </p></div><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl border border-slate-900/40 bg-white px-4 py-3 shadow-[3px_3px_0_rgba(15,23,42,0.12)]"><div class="flex items-center gap-3"><span class="text-[11px] font-semibold text-slate-800"> Store </span><div class="inline-flex rounded-full bg-slate-50 border border-slate-900/30 p-1"><button type="button" class="${ssrRenderClass([
        "px-3 py-1 rounded-full text-[11px] font-semibold transition-colors",
        selectedStore.value === "apple" ? "bg-slate-900 text-amber-100" : "bg-transparent text-slate-600 hover:bg-slate-100"
      ])}"> \u{1F34E} App Store </button><button type="button" class="${ssrRenderClass([
        "px-3 py-1 rounded-full text-[11px] font-semibold transition-colors",
        selectedStore.value === "google" ? "bg-slate-900 text-emerald-100" : "bg-transparent text-slate-600 hover:bg-slate-100"
      ])}"> \u{1F916} Google Play </button></div></div><div class="inline-flex rounded-full bg-slate-50 border border-slate-900/30 p-1 self-start md:self-auto"><button type="button" class="${ssrRenderClass([
        "px-3 py-1 rounded-full text-[11px] font-medium transition-colors",
        activeTab.value === "lookup" ? "bg-slate-900 text-slate-50" : "bg-transparent text-slate-700 hover:bg-slate-100"
      ])}"> App Lookup </button><button type="button" class="${ssrRenderClass([
        "px-3 py-1 rounded-full text-[11px] font-medium transition-colors",
        activeTab.value === "search" ? "bg-slate-900 text-slate-50" : "bg-transparent text-slate-700 hover:bg-slate-100"
      ])}"> Keyword Search </button></div></div>`);
      if (activeTab.value === "lookup") {
        _push(`<div class="space-y-6"><section class="relative overflow-hidden rounded-2xl border border-slate-900/30 bg-gradient-to-br from-white via-slate-50 to-amber-50 px-5 py-5 shadow-[3px_3px_0_rgba(15,23,42,0.16)]"><div class="pointer-events-none absolute -right-12 -top-10 h-24 w-24 rounded-full bg-amber-100/60 border border-amber-200/60"></div><div class="pointer-events-none absolute -right-24 top-10 h-32 w-32 rounded-full bg-sky-100/50 border border-sky-200/60"></div><div class="relative flex flex-col lg:flex-row gap-6"><div class="flex-1 space-y-4"><div><p class="text-[11px] uppercase tracking-[0.2em] text-slate-700 font-semibold"> App lookup (${ssrInterpolate(platformName.value)}) </p><h2 class="text-xl font-semibold text-slate-900 mt-1"> Check detailed metrics for a single app </h2></div><div class="flex flex-col sm:flex-row sm:items-end gap-3 mt-3"><div class="flex-1 space-y-1.5"><label class="text-[11px] font-medium text-slate-800">${ssrInterpolate(lookupIdLabel.value)}</label><input${ssrRenderAttr("value", appId.value)} type="text"${ssrRenderAttr("placeholder", lookupPlaceholder.value)} class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"></div><div class="space-y-1.5 w-full sm:w-32"><label class="text-[11px] font-medium text-slate-800"> Country </label><select class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"><!--[-->`);
        ssrRenderList("AppCountries" in _ctx ? _ctx.AppCountries : unref(AppCountries), (code, name) => {
          _push(`<option${ssrRenderAttr("value", code)}${ssrIncludeBooleanAttr(Array.isArray(country.value) ? ssrLooseContain(country.value, code) : ssrLooseEqual(country.value, code)) ? " selected" : ""}>${ssrInterpolate(name)} (${ssrInterpolate(code.toUpperCase())}) </option>`);
        });
        _push(`<!--]--></select></div><button type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-slate-900 text-amber-100 border border-slate-900 shadow-[2px_2px_0_rgba(15,23,42,0.3)] transition-transform hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"${ssrIncludeBooleanAttr(appLoading.value) ? " disabled" : ""}>`);
        if (!appLoading.value) {
          _push(`<span>Run lookup</span>`);
        } else {
          _push(`<span>Checking\u2026</span>`);
        }
        _push(`</button></div><p class="text-[10px] text-slate-600 mt-1.5"> Example: <code class="px-1 py-[1px] bg-white border border-slate-200 rounded text-[10px]">${ssrInterpolate(lookupExample.value)}</code></p>`);
        if (appError.value) {
          _push(`<p class="mt-2 text-xs text-red-500 flex items-center gap-1"><span>\u26A0\uFE0F</span>${ssrInterpolate(appError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full lg:w-64 rounded-xl bg-white/90 border border-slate-200 px-3.5 py-3 text-[11px] text-slate-700 shadow-sm backdrop-blur flex flex-col gap-2"><p class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.12em]"> Snapshot </p>`);
        if (appLoading.value) {
          _push(`<div class="space-y-2 animate-pulse"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-slate-100"></div><div class="flex-1 space-y-1"><div class="h-3 rounded bg-slate-100"></div><div class="h-2.5 rounded bg-slate-100 w-3/4"></div></div></div><div class="space-y-2 mt-1.5"><div class="h-5 rounded bg-slate-100"></div><div class="h-5 rounded bg-slate-100"></div><div class="h-5 rounded bg-slate-100"></div></div></div>`);
        } else if (appResult.value) {
          _push(`<div class="space-y-3"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", appResult.value.icon)}${ssrRenderAttr("alt", appResult.value.title)} class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 object-cover"><div class="truncate"><p class="text-[13px] font-semibold text-slate-900 truncate">${ssrInterpolate(appResult.value.title)}</p><p class="text-[11px] text-slate-600 truncate">${ssrInterpolate(appResult.value.developer)}</p></div></div><div class="space-y-2 mt-1.5"><div class="flex justify-between items-baseline"><p class="text-[11px] text-slate-500">Rating</p><p class="text-[12px] text-slate-900 font-semibold">${ssrInterpolate(appResult.value.rating ? appResult.value.rating.toFixed(1) : "N/A")}</p></div><div class="flex justify-between items-baseline"><p class="text-[11px] text-slate-500">Reviews</p><p class="text-[12px] text-slate-900 font-semibold">${ssrInterpolate(formatCompactNumber(appResult.value.ratingCount))}</p></div><div class="flex justify-between items-baseline"><p class="text-[11px] text-slate-500">${ssrInterpolate(selectedStore.value === "apple" ? "Size" : "Installs")}</p><p class="text-[12px] text-slate-900 font-semibold">${ssrInterpolate(selectedStore.value === "apple" ? prettySize(appResult.value.size) : formatCompactNumber(appResult.value.installs))}</p></div></div></div>`);
        } else {
          _push(`<div class="text-[11px] text-slate-500"> No app selected yet. Run a lookup to see rating &amp; review stats. </div>`);
        }
        _push(`</div></div></section>`);
        if (appResult.value) {
          _push(`<section class="grid grid-cols-1 lg:grid-cols-3 gap-5"><div class="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-[3px_3px_0_rgba(15,23,42,0.12)]"><div class="flex flex-col md:flex-row gap-4 mb-4"><img${ssrRenderAttr("src", appResult.value.icon)}${ssrRenderAttr("alt", appResult.value.title)} class="w-20 h-20 rounded-3xl bg-slate-100 border border-slate-200 object-cover"><div class="flex-1 space-y-2"><div class="flex flex-wrap items-center gap-2"><h2 class="text-base font-semibold text-slate-900">${ssrInterpolate(appResult.value.title)}</h2>`);
          if (appResult.value.genre) {
            _push(`<span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px] text-[10px] uppercase tracking-wide text-slate-600">${ssrInterpolate(appResult.value.genre)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-xs text-slate-600">${ssrInterpolate(appResult.value.developer)}</p><div class="mt-3 flex flex-wrap items-center gap-3"><a${ssrRenderAttr("href", appResult.value.url)} target="_blank" class="inline-flex items-center gap-1 text-xs font-medium text-slate-900 px-2 py-1 bg-amber-100 border border-slate-300 rounded shadow-[2px_2px_0_rgba(15,23,42,0.15)] hover:bg-amber-200/80"> Open in ${ssrInterpolate(platformName.value)} \u2192 </a>`);
          if (appResult.value.ratingCount && appResult.value.ratingCount > 0) {
            _push(`<button type="button" class="inline-flex items-center gap-1 text-xs font-medium text-slate-900 px-2 py-1 bg-amber-100 border border-slate-300 rounded shadow-[2px_2px_0_rgba(15,23,42,0.15)] hover:bg-amber-200/80"> View recent reviews </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-3 max-w-md text-[11px]"><div><p class="text-[10px] text-slate-500 uppercase">Rating</p><p class="text-sm font-semibold text-slate-900">${ssrInterpolate(appResult.value.rating ? appResult.value.rating.toFixed(1) : "N/A")} <span class="text-[10px] text-slate-400">/ 5</span></p></div><div><p class="text-[10px] text-slate-500 uppercase"> Total ratings </p><p class="text-sm font-semibold text-slate-900">${ssrInterpolate(formatNumber(appResult.value.ratingCount))}</p></div>`);
          if (selectedStore.value === "apple") {
            _push(`<div><p class="text-[10px] text-slate-500 uppercase">Size</p><p class="text-sm font-semibold text-slate-900">${ssrInterpolate(prettySize(appResult.value.size))}</p></div>`);
          } else {
            _push(`<div><p class="text-[10px] text-slate-500 uppercase"> Downloads </p><p class="text-sm font-semibold text-slate-900">${ssrInterpolate(formatNumber(appResult.value.installs))}</p></div>`);
          }
          _push(`</div><div class="mt-3 flex flex-wrap gap-2 text-[10px]">`);
          if (appResult.value.free) {
            _push(`<span class="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-[2px] font-medium"> Free </span>`);
          } else {
            _push(`<span class="inline-flex items-center rounded-full bg-slate-900 text-amber-100 border border-slate-900 px-2 py-[2px] font-medium">${ssrInterpolate(appResult.value.currency || "$")}${ssrInterpolate(appResult.value.price)}</span>`);
          }
          if (appResult.value.contentRating) {
            _push(`<span class="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-[2px]">${ssrInterpolate(appResult.value.contentRating)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (appResult.value.requiredOsVersion) {
            _push(`<span class="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-[2px]">`);
            if (selectedStore.value === "apple") {
              _push(`<span>iOS </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(` ${ssrInterpolate(appResult.value.requiredOsVersion)} `);
            if (selectedStore.value === "apple") {
              _push(`<span>+</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-500">`);
          if (appResult.value.id && selectedStore.value === "apple") {
            _push(`<span> ID: <span class="font-mono text-slate-700">${ssrInterpolate(appResult.value.id)}</span> \xB7 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` appId: <span class="font-mono text-slate-700">${ssrInterpolate(appResult.value.appId)}</span></p></div></div><div class="border-t border-slate-100 pt-3 mt-2"><h3 class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.16em] mb-2 inline-flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span> Description </h3><p class="text-xs text-slate-800 whitespace-pre-line max-h-64 overflow-y-auto pr-1 bg-slate-50 border border-slate-100 rounded-md px-2 py-2">${ssrInterpolate(appResult.value.description)}</p></div>`);
          if (appResult.value.releaseNotes) {
            _push(`<div class="border-t border-slate-100 pt-3 mt-3"><h3 class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.16em] mb-1.5 inline-flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span> Latest release notes </h3><p class="text-xs text-slate-800 whitespace-pre-line max-h-48 overflow-y-auto pr-1 bg-slate-50 border border-slate-100 rounded-md px-2 py-2">${ssrInterpolate(appResult.value.releaseNotes)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="space-y-4"><div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-[2px_2px_0_rgba(15,23,42,0.12)] text-[11px] text-slate-700 space-y-2"><h3 class="text-[11px] font-semibold text-slate-900 uppercase tracking-[0.16em] mb-1 inline-flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span> Meta &amp; platform </h3><div class="flex justify-between"><span class="text-slate-500">Primary genre</span><span class="font-medium text-slate-800">${ssrInterpolate(appResult.value.genre || "\u2014")}</span></div><div class="flex justify-between"><span class="text-slate-500">All genres</span><span class="text-right max-w-[160px]">${ssrInterpolate(((_a = appResult.value.genres) == null ? void 0 : _a.join(", ")) || "\u2014")}</span></div><div class="flex justify-between"><span class="text-slate-500">Languages</span><span class="text-right max-w-[160px]">${ssrInterpolate(joinLanguages(appResult.value.languages))}</span></div><div class="flex justify-between"><span class="text-slate-500">${ssrInterpolate(requiredOsLabel.value)}</span><span class="font-medium text-slate-800">${ssrInterpolate(appResult.value.requiredOsVersion || "\u2014")}</span></div><div class="flex justify-between"><span class="text-slate-500">Released</span><span class="text-slate-800">${ssrInterpolate(appResult.value.released || "\u2014")}</span></div><div class="flex justify-between"><span class="text-slate-500">Last updated</span><span class="text-slate-800">${ssrInterpolate(appResult.value.updated || appResult.value.currentVersionReleaseDate || "\u2014")}</span></div></div><div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-[2px_2px_0_rgba(15,23,42,0.12)] text-[11px] text-slate-700 space-y-2"><h3 class="text-[11px] font-semibold text-slate-900 uppercase tracking-[0.16em] mb-1 inline-flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span> Developer </h3><div class="flex justify-between"><span class="text-slate-500">Name</span><span class="text-right max-w-[160px] text-slate-800 truncate">${ssrInterpolate(appResult.value.developer || "\u2014")}</span></div><div class="flex justify-between"><span class="text-slate-500">Developer ID</span><span class="text-right max-w-[160px] text-slate-800 truncate">${ssrInterpolate(appResult.value.developerId || "\u2014")}</span></div><div class="mt-2">`);
          if (appResult.value.developerUrl) {
            _push(`<a${ssrRenderAttr("href", appResult.value.developerUrl)} target="_blank" class="inline-flex items-center gap-1 text-[11px] text-slate-900 font-medium px-2 py-1 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100"> View developer on ${ssrInterpolate(platformName.value)} \u2192 </a>`);
          } else {
            _push(`<p class="text-[10px] text-slate-400"> No developer URL exposed. </p>`);
          }
          _push(`</div></div></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "search") {
        _push(`<div><section class="bg-white border border-slate-200 rounded-2xl p-4 shadow-[3px_3px_0_rgba(15,23,42,0.12)]"><div class="flex items-center justify-between gap-2 mb-3"><div><h2 class="text-sm font-semibold text-slate-900"> Keyword search (${ssrInterpolate(platformName.value)}) </h2><p class="text-xs text-slate-600"> Find competitors or scan a niche by keyword and country. </p></div>`);
        if (difficultyLoading.value || difficultyScore.value !== null || difficultyError.value) {
          _push(`<div class="flex-shrink-0 w-32 text-center">`);
          if (difficultyLoading.value) {
            _push(`<div class="flex flex-col items-center gap-1 text-xs text-slate-500 pt-2"><span class="animate-spin text-lg">\u23F3</span><span>Analyzing...</span></div>`);
          } else if (difficultyError.value) {
            _push(`<p class="text-xs text-red-500 pt-2"> \u26A0\uFE0F ${ssrInterpolate(difficultyError.value)}</p>`);
          } else if (difficultyScore.value !== null) {
            _push(`<div class="flex flex-col items-center gap-0"><p class="text-[10px] font-medium text-slate-600 uppercase tracking-wide"> Difficulty </p><p class="text-3xl font-bold text-slate-900 leading-tight">${ssrInterpolate(difficultyScore.value)} <span class="text-base text-slate-400">/ 100</span></p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-1 sm:grid-cols-12 sm:items-end gap-3"><div class="col-span-12 sm:col-span-8 space-y-1.5"><label class="text-[11px] font-medium text-slate-800"> Search keyword </label><input${ssrRenderAttr("value", searchTerm.value)} type="text" placeholder="habit, task manager, ai chat\u2026" class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"></div><div class="col-span-12 sm:col-span-4 space-y-1.5"><label class="text-[11px] font-medium text-slate-800"> Country </label><select class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"><!--[-->`);
        ssrRenderList("AppCountries" in _ctx ? _ctx.AppCountries : unref(AppCountries), (code, name) => {
          _push(`<option${ssrRenderAttr("value", code)}${ssrIncludeBooleanAttr(Array.isArray(searchCountry.value) ? ssrLooseContain(searchCountry.value, code) : ssrLooseEqual(searchCountry.value, code)) ? " selected" : ""}>${ssrInterpolate(name)} (${ssrInterpolate(code.toUpperCase())}) </option>`);
        });
        _push(`<!--]--></select></div><div class="col-span-12"><button type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-slate-900 text-amber-100 border border-slate-900 shadow-[2px_2px_0_rgba(15,23,42,0.3)] transition-transform hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed w-full"${ssrIncludeBooleanAttr(searchLoading.value) ? " disabled" : ""}>`);
        if (!searchLoading.value) {
          _push(`<span>Search</span>`);
        } else {
          _push(`<span>Searching\u2026</span>`);
        }
        _push(`</button></div></div>`);
        if (searchError.value) {
          _push(`<p class="mt-3 text-xs text-red-500 flex items-center gap-1"><span>\u26A0\uFE0F</span>${ssrInterpolate(searchError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (searchResults.value.length) {
          _push(`<div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"><!--[-->`);
          ssrRenderList(searchResults.value, (app) => {
            _push(`<div class="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-amber-50 transition-colors"><img${ssrRenderAttr("src", app.icon)}${ssrRenderAttr("alt", app.title)} class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 object-cover flex-shrink-0"><div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-2"><div class="flex-1 space-y-0.5 min-w-0"><h3 class="text-xs font-semibold text-slate-900 truncate">${ssrInterpolate(app.title)}</h3><p class="text-[10px] text-slate-600 truncate">${ssrInterpolate(app.developer)}</p></div><span class="text-[11px] text-slate-800 whitespace-nowrap flex-shrink-0 px-1.5 py-[1px] bg-white border border-slate-200 rounded"> \u2B50 ${ssrInterpolate(app.rating ? app.rating.toFixed(1) : "N/A")}</span></div><p class="text-[10px] text-slate-700 mt-1">${ssrInterpolate(app.free ? "Free" : (app.currency || "$") + app.price)}</p><div class="mt-1.5 flex items-center justify-between"><div class="min-w-0 flex-1 pr-2"><code class="text-[9px] px-2 py-[2px] rounded-full bg-white border border-slate-200 text-slate-500 truncate inline-block max-w-full">${ssrInterpolate(app.appId)}</code></div><div class="flex items-center gap-2 flex-shrink-0 text-[10px]"><a${ssrRenderAttr("href", app.url)} target="_blank" class="text-sky-600 hover:text-sky-500"> View \u2192 </a><span class="text-slate-300">|</span><button type="button" class="text-slate-700 underline-offset-2 hover:underline"> Inspect </button></div></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!searchLoading.value && !searchResults.value.length && !searchError.value) {
          _push(`<p class="mt-4 text-[11px] text-slate-500 flex items-center gap-1"><span>\u{1F50D}</span> No search results yet \u2013 try a keyword like <span class="font-medium text-slate-600 ml-1">&quot;habit&quot;</span> or <span class="font-medium text-slate-600 ml-1">&quot;ai chat&quot;</span>. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_About, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showReviewsModal.value,
        appId: (_b = appResult.value) == null ? void 0 : _b.appId,
        id: (_c = appResult.value) == null ? void 0 : _c.id,
        store: selectedStore.value,
        initialCountry: country.value,
        onClose: ($event) => showReviewsModal.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CHnpwRvC.mjs.map
