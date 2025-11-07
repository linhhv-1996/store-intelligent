<script setup lang="ts">
import { ref, computed } from 'vue'
import ReviewsModal from '~/components/ReviewsModal.vue'

// --- STATE ---

type StoreType = 'apple' | 'google'

// --- State chung ---
const selectedStore = ref<StoreType>('apple')
const activeTab = ref<'lookup' | 'search'>('lookup')

// --- App Lookup state ---
const appId = ref('')
const country = ref('us')
const appResult = ref<any | null>(null)
const appError = ref('')
const appLoading = ref(false)

// --- Keyword Search state ---
const searchTerm = ref('')
const searchCountry = ref('us')
const searchResults = ref<any[]>([])
const searchError = ref('')
const searchLoading = ref(false)

// --- Reviews modal state ---
const showReviewsModal = ref(false)

// --- COMPUTED ---

const lookupIdLabel = computed(() => {
  return selectedStore.value === 'apple'
    ? 'appId or numeric App Store ID'
    : 'Google Play App ID'
})

const lookupPlaceholder = computed(() => {
  return selectedStore.value === 'apple'
    ? 'com.your.app or 1234567890'
    : 'com.google.android.apps.maps'
})

const lookupExample = computed(() => {
  return selectedStore.value === 'apple'
    ? 'com.facebook.Facebook or 284882215'
    : 'com.google.android.apps.maps'
})

const platformName = computed(() => {
  return selectedStore.value === 'apple' ? 'App Store' : 'Google Play'
})

const requiredOsLabel = computed(() => {
  return selectedStore.value === 'apple' ? 'Required iOS' : 'Required Android'
})

// --- HELPERS ---

const prettySize = (raw: any) => {
  if (!raw) return '—'
  if (typeof raw === 'string' && (raw.endsWith('M') || raw.endsWith('G') || raw.endsWith('k'))) {
    return raw
  }
  const num = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw)
  if (!num || Number.isNaN(num)) return '—'
  const mb = num / (1024 * 1024)
  if (mb < 1) return num.toLocaleString() + ' B'
  return mb.toFixed(1) + ' MB'
}

const joinLanguages = (langs?: string[]) => {
  if (!langs || !langs.length) return '—'
  if (langs.length <= 3) return langs.join(', ')
  return langs.slice(0, 3).join(', ') + ` +${langs.length - 3}`
}

const formatNumber = (n: number | null | undefined) => {
  if (n === null || n === undefined || Number.isNaN(n)) return '0'
  return n.toLocaleString()
}

const formatCompactNumber = (n: number | null | undefined) => {
  if (n === null || n === undefined || Number.isNaN(n) || n === 0) return '0'
  try {
    const num = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    }).format(n)
    return num.replace(/\.0(?=[KMGTB])/, '')
  } catch (e) {
    if (n < 1000000) return (n / 1000).toFixed(0) + 'K'
    return (n / 1_000_000).toFixed(1) + 'M'
  }
}

// --- FUNCTIONS ---

const onStoreChange = () => {
  appId.value = ''
  appResult.value = null
  appError.value = ''
  appLoading.value = false

  searchTerm.value = ''
  searchResults.value = []
  searchError.value = ''
  searchLoading.value = false
}

const setStore = (store: StoreType) => {
  if (selectedStore.value === store) return
  selectedStore.value = store
  onStoreChange()
}

const checkApp = async () => {
  appError.value = ''
  appResult.value = null

  const value = appId.value.trim()
  if (!value) {
    appError.value = 'Enter an App ID'
    return
  }

  appLoading.value = true
  try {
    const isNumeric = /^\d+$/.test(value)
    const params: Record<string, string> = {
      country: country.value,
      store: selectedStore.value
    }

    if (selectedStore.value === 'apple' && isNumeric) {
      params.id = value
    } else {
      params.appId = value
    }

    // @ts-ignore
    const data = await $fetch('/api/app', { params })

    if ((data as any).error) {
      appError.value = (data as any).error
    } else {
      appResult.value = data
    }
  } catch (e) {
    appError.value = 'Something went wrong'
  } finally {
    appLoading.value = false
  }
}

const openReviews = async () => {
  if (!appResult.value) return
  showReviewsModal.value = true
  try {
    // preload if muốn, nhưng giờ chỉ mở modal
    // @ts-ignore
    await $fetch('/api/reviews', {
      params: {
        appId: appResult.value.appId,
        id: appResult.value.id,
        country: country.value,
        store: selectedStore.value
      }
    })
  } catch (e) {}
}

const searchApps = async () => {
  searchError.value = ''
  searchResults.value = []

  const term = searchTerm.value.trim()
  if (!term) {
    searchError.value = 'Enter a keyword to search'
    return
  }

  searchLoading.value = true
  try {
    // @ts-ignore
    const data = await $fetch('/api/search', {
      params: {
        term,
        country: searchCountry.value,
        limit: '12',
        store: selectedStore.value
      }
    })

    if ((data as any).error) {
      searchError.value = (data as any).error
    } else {
      searchResults.value = data as any[]
    }
  } catch (e) {
    searchError.value = 'Something went wrong'
  } finally {
    searchLoading.value = false
  }
}

const inspectFromSearch = (app: any) => {
  activeTab.value = 'lookup'
  appId.value = app.appId
  country.value = searchCountry.value
  appResult.value = null
  appError.value = ''
  checkApp()
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">

      <!-- Store & Tab Switcher -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-3
               rounded-2xl border border-slate-900/40 bg-white
               px-4 py-3 shadow-[3px_3px_0_rgba(15,23,42,0.12)]"
      >
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold text-slate-800">
            Store
          </span>
          <div
            class="inline-flex rounded-full bg-slate-50 border border-slate-900/30 p-1"
          >
            <button
              type="button"
              @click="setStore('apple')"
              :class="[
                'px-3 py-1 rounded-full text-[11px] font-semibold transition-colors',
                selectedStore === 'apple'
                  ? 'bg-slate-900 text-amber-100'
                  : 'bg-transparent text-slate-600 hover:bg-slate-100'
              ]"
            >
              🍎 App Store
            </button>
            <button
              type="button"
              @click="setStore('google')"
              :class="[
                'px-3 py-1 rounded-full text-[11px] font-semibold transition-colors',
                selectedStore === 'google'
                  ? 'bg-slate-900 text-emerald-100'
                  : 'bg-transparent text-slate-600 hover:bg-slate-100'
              ]"
            >
              🤖 Google Play
            </button>
          </div>
        </div>

        <div
          class="inline-flex rounded-full bg-slate-50 border border-slate-900/30 p-1 self-start md:self-auto"
        >
          <button
            type="button"
            @click="activeTab = 'lookup'"
            :class="[
              'px-3 py-1 rounded-full text-[11px] font-medium transition-colors',
              activeTab === 'lookup'
                ? 'bg-slate-900 text-slate-50'
                : 'bg-transparent text-slate-700 hover:bg-slate-100'
            ]"
          >
            App Lookup
          </button>
          <button
            type="button"
            @click="activeTab = 'search'"
            :class="[
              'px-3 py-1 rounded-full text-[11px] font-medium transition-colors',
              activeTab === 'search'
                ? 'bg-slate-900 text-slate-50'
                : 'bg-transparent text-slate-700 hover:bg-slate-100'
            ]"
          >
            Keyword Search
          </button>
        </div>
      </div>

      <!-- LOOKUP TAB -->
      <div v-if="activeTab === 'lookup'" class="space-y-6">
        <!-- Lookup card -->
        <section
          class="relative overflow-hidden rounded-2xl border border-slate-900/30
                 bg-gradient-to-br from-white via-slate-50 to-amber-50
                 px-5 py-5 shadow-[3px_3px_0_rgba(15,23,42,0.16)]"
        >
          <div
            class="pointer-events-none absolute -right-12 -top-10 h-24 w-24 rounded-full bg-amber-100/60 border border-amber-200/60"
          />
          <div
            class="pointer-events-none absolute -right-24 top-10 h-32 w-32 rounded-full bg-sky-100/50 border border-sky-200/60"
          />

          <div class="relative flex flex-col lg:flex-row gap-6">
            <div class="flex-1 space-y-4">
              <div>
                <p
                  class="text-[11px] uppercase tracking-[0.2em] text-slate-700 font-semibold"
                >
                  App lookup ({{ platformName }})
                </p>
                <h2 class="text-xl font-semibold text-slate-900 mt-1">
                  Check detailed metrics for a single app
                </h2>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-end gap-3 mt-3">
                <div class="flex-1 space-y-1.5">
                  <label class="text-[11px] font-medium text-slate-800">
                    {{ lookupIdLabel }}
                  </label>
                  <input
                    v-model="appId"
                    type="text"
                    :placeholder="lookupPlaceholder"
                    class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"
                  />
                </div>

                <div class="space-y-1.5 w-full sm:w-32">
                  <label class="text-[11px] font-medium text-slate-800">
                    Country
                  </label>
                  <select
                    v-model="country"
                    class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"
                  >
                    <option value="us">US</option>
                    <option value="vn">VN</option>
                    <option value="gb">UK</option>
                    <option value="jp">JP</option>
                    <option value="de">DE</option>
                  </select>
                </div>

                <button
                  type="button"
                  @click="checkApp"
                  class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium
                         bg-slate-900 text-amber-100 border border-slate-900
                         shadow-[2px_2px_0_rgba(15,23,42,0.3)] transition-transform
                         hover:-translate-y-[1px] active:translate-y-0
                         disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                  :disabled="appLoading"
                >
                  <span v-if="!appLoading">Run lookup</span>
                  <span v-else>Checking…</span>
                </button>
              </div>

              <p class="text-[10px] text-slate-600 mt-1.5">
                Example:
                <code
                  class="px-1 py-[1px] bg-white border border-slate-200 rounded text-[10px]"
                >
                  {{ lookupExample }}
                </code>
              </p>

              <p
                v-if="appError"
                class="mt-2 text-xs text-red-500 flex items-center gap-1"
              >
                <span>⚠️</span>{{ appError }}
              </p>
            </div>

            <!-- Snapshot -->
            <div
              class="w-full lg:w-64 rounded-xl bg-white/90 border border-slate-200 px-3.5 py-3 text-[11px] text-slate-700
                     shadow-sm backdrop-blur flex flex-col gap-2"
            >
              <p
                class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.12em]"
              >
                Snapshot
              </p>

              <div v-if="appLoading" class="space-y-2 animate-pulse">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100" />
                  <div class="flex-1 space-y-1">
                    <div class="h-3 rounded bg-slate-100" />
                    <div class="h-2.5 rounded bg-slate-100 w-3/4" />
                  </div>
                </div>
                <div class="space-y-2 mt-1.5">
                  <div class="h-5 rounded bg-slate-100" />
                  <div class="h-5 rounded bg-slate-100" />
                  <div class="h-5 rounded bg-slate-100" />
                </div>
              </div>

              <div v-else-if="appResult" class="space-y-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="appResult.icon"
                    :alt="appResult.title"
                    class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 object-cover"
                  />
                  <div class="truncate">
                    <p class="text-[13px] font-semibold text-slate-900 truncate">
                      {{ appResult.title }}
                    </p>
                    <p class="text-[11px] text-slate-600 truncate">
                      {{ appResult.developer }}
                    </p>
                  </div>
                </div>

                <div class="space-y-2 mt-1.5">
                  <div class="flex justify-between items-baseline">
                    <p class="text-[11px] text-slate-500">Rating</p>
                    <p class="text-[12px] text-slate-900 font-semibold">
                      {{ appResult.rating ? appResult.rating.toFixed(1) : 'N/A' }}
                    </p>
                  </div>
                  <div class="flex justify-between items-baseline">
                    <p class="text-[11px] text-slate-500">Reviews</p>
                    <p class="text-[12px] text-slate-900 font-semibold">
                      {{ formatCompactNumber(appResult.ratingCount) }}
                    </p>
                  </div>
                  <div class="flex justify-between items-baseline">
                    <p class="text-[11px] text-slate-500">
                      {{ selectedStore === 'apple' ? 'Size' : 'Installs' }}
                    </p>
                    <p class="text-[12px] text-slate-900 font-semibold">
                      {{
                        selectedStore === 'apple'
                          ? prettySize(appResult.size)
                          : formatCompactNumber(appResult.installs)
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else class="text-[11px] text-slate-500">
                No app selected yet. Run a lookup to see rating & review stats.
              </div>
            </div>
          </div>
        </section>

        <!-- Details -->
        <section v-if="appResult" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- Left: main -->
          <div
            class="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4
                   shadow-[3px_3px_0_rgba(15,23,42,0.12)]"
          >
            <div class="flex flex-col md:flex-row gap-4 mb-4">
              <img
                :src="appResult.icon"
                :alt="appResult.title"
                class="w-20 h-20 rounded-3xl bg-slate-100 border border-slate-200 object-cover"
              />

              <div class="flex-1 space-y-2">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-base font-semibold text-slate-900">
                    {{ appResult.title }}
                  </h2>
                  <span
                    v-if="appResult.genre"
                    class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px]
                           text-[10px] uppercase tracking-wide text-slate-600"
                  >
                    {{ appResult.genre }}
                  </span>
                </div>
                <p class="text-xs text-slate-600">
                  {{ appResult.developer }}
                </p>

                <div class="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    :href="appResult.url"
                    target="_blank"
                    class="inline-flex items-center gap-1 text-xs font-medium text-slate-900
                           px-2 py-1 bg-amber-100 border border-slate-300 rounded
                           shadow-[2px_2px_0_rgba(15,23,42,0.15)] hover:bg-amber-200/80"
                  >
                    Open in {{ platformName }} →
                  </a>
                  <button
                    v-if="appResult.ratingCount && appResult.ratingCount > 0"
                    type="button"
                    @click="openReviews"
                    class="inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] text-slate-800
                           bg-white border border-slate-200 hover:bg-slate-50"
                  >
                    View recent reviews
                  </button>
                </div>

                <div
                  class="mt-4 pt-3 border-t border-slate-100
                         grid grid-cols-3 gap-3 max-w-md text-[11px]"
                >
                  <div>
                    <p class="text-[10px] text-slate-500 uppercase">Rating</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ appResult.rating ? appResult.rating.toFixed(1) : 'N/A' }}
                      <span class="text-[10px] text-slate-400">/ 5</span>
                    </p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500 uppercase">
                      Total ratings
                    </p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ formatNumber(appResult.ratingCount) }}
                    </p>
                  </div>
                  <div v-if="selectedStore === 'apple'">
                    <p class="text-[10px] text-slate-500 uppercase">Size</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ prettySize(appResult.size) }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="text-[10px] text-slate-500 uppercase">
                      Downloads
                    </p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ formatNumber(appResult.installs) }}
                    </p>
                  </div>
                </div>

                <div class="mt-3 flex flex-wrap gap-2 text-[10px]">
                  <span
                    v-if="appResult.free"
                    class="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-[2px] font-medium"
                  >
                    Free
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center rounded-full bg-slate-900 text-amber-100 border border-slate-900 px-2 py-[2px] font-medium"
                  >
                    {{ appResult.currency || '$' }}{{ appResult.price }}
                  </span>
                  <span
                    v-if="appResult.contentRating"
                    class="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-[2px]"
                  >
                    {{ appResult.contentRating }}
                  </span>
                  <span
                    v-if="appResult.requiredOsVersion"
                    class="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-[2px]"
                  >
                    <span v-if="selectedStore === 'apple'">iOS </span>
                    {{ appResult.requiredOsVersion }}
                    <span v-if="selectedStore === 'apple'">+</span>
                  </span>
                </div>

                <p
                  class="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-500"
                >
                  <span v-if="appResult.id && selectedStore === 'apple'">
                    ID:
                    <span class="font-mono text-slate-700">{{ appResult.id }}</span>
                    ·
                  </span>
                  appId:
                  <span class="font-mono text-slate-700">{{ appResult.appId }}</span>
                </p>
              </div>
            </div>

            <div class="border-t border-slate-100 pt-3 mt-2">
              <h3
                class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.16em] mb-2
                       inline-flex items-center gap-1"
              >
                <span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span>
                Description
              </h3>
              <p
                class="text-xs text-slate-800 whitespace-pre-line max-h-64 overflow-y-auto pr-1
                       bg-slate-50 border border-slate-100 rounded-md px-2 py-2"
              >
                {{ appResult.description }}
              </p>
            </div>

            <div
              v-if="appResult.releaseNotes"
              class="border-t border-slate-100 pt-3 mt-3"
            >
              <h3
                class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.16em] mb-1.5
                       inline-flex items-center gap-1"
              >
                <span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span>
                Latest release notes
              </h3>
              <p
                class="text-xs text-slate-800 whitespace-pre-line max-h-48 overflow-y-auto pr-1
                       bg-slate-50 border border-slate-100 rounded-md px-2 py-2"
              >
                {{ appResult.releaseNotes }}
              </p>
            </div>
          </div>

          <!-- Right: meta -->
          <div class="space-y-4">
            <div
              class="bg-white border border-slate-200 rounded-2xl p-4
                     shadow-[2px_2px_0_rgba(15,23,42,0.12)] text-[11px] text-slate-700 space-y-2"
            >
              <h3
                class="text-[11px] font-semibold text-slate-900 uppercase tracking-[0.16em] mb-1
                       inline-flex items-center gap-1"
              >
                <span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span>
                Meta & platform
              </h3>
              <div class="flex justify-between">
                <span class="text-slate-500">Primary genre</span>
                <span class="font-medium text-slate-800">
                  {{ appResult.genre || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">All genres</span>
                <span class="text-right max-w-[160px]">
                  {{ appResult.genres?.join(', ') || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Languages</span>
                <span class="text-right max-w-[160px]">
                  {{ joinLanguages(appResult.languages) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ requiredOsLabel }}</span>
                <span class="font-medium text-slate-800">
                  {{ appResult.requiredOsVersion || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Released</span>
                <span class="text-slate-800">
                  {{ appResult.released || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Last updated</span>
                <span class="text-slate-800">
                  {{ appResult.updated || appResult.currentVersionReleaseDate || '—' }}
                </span>
              </div>
            </div>

            <div
              class="bg-white border border-slate-200 rounded-2xl p-4
                     shadow-[2px_2px_0_rgba(15,23,42,0.12)] text-[11px] text-slate-700 space-y-2"
            >
              <h3
                class="text-[11px] font-semibold text-slate-900 uppercase tracking-[0.16em] mb-1
                       inline-flex items-center gap-1"
              >
                <span class="h-1.5 w-1.5 rounded-sm bg-slate-900 inline-block"></span>
                Developer
              </h3>
              <div class="flex justify-between">
                <span class="text-slate-500">Name</span>
                <span class="text-right max-w-[160px] text-slate-800 truncate">
                  {{ appResult.developer || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Developer ID</span>
                <span class="text-right max-w-[160px] text-slate-800 truncate">
                  {{ appResult.developerId || '—' }}
                </span>
              </div>
              <div class="mt-2">
                <a
                  v-if="appResult.developerUrl"
                  :href="appResult.developerUrl"
                  target="_blank"
                  class="inline-flex items-center gap-1 text-[11px] text-slate-900 font-medium
                         px-2 py-1 bg-slate-50 border border-slate-200 rounded
                         hover:bg-slate-100"
                >
                  View developer on {{ platformName }} →
                </a>
                <p v-else class="text-[10px] text-slate-400">
                  No developer URL exposed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- SEARCH TAB -->
      <div v-if="activeTab === 'search'">
        <section
          class="bg-white border border-slate-200 rounded-2xl p-4
                 shadow-[3px_3px_0_rgba(15,23,42,0.12)]"
        >
          <div class="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 class="text-sm font-semibold text-slate-900">
                Keyword search ({{ platformName }})
              </h2>
              <p class="text-xs text-slate-600">
                Find competitors or scan a niche by keyword and country.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 sm:items-end gap-3">
            <div class="col-span-12 sm:col-span-8 space-y-1.5">
              <label class="text-[11px] font-medium text-slate-800">
                Search keyword
              </label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="habit, task manager, ai chat…"
                class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"
              />
            </div>

            <div class="col-span-12 sm:col-span-4 space-y-1.5">
              <label class="text-[11px] font-medium text-slate-800">
                Country
              </label>
              <select
                v-model="searchCountry"
                class="w-full rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900/60"
              >
                <option value="us">US</option>
                <option value="vn">VN</option>
                <option value="gb">UK</option>
                <option value="jp">JP</option>
                <option value="de">DE</option>
              </select>
            </div>

            <div class="col-span-12">
              <button
                type="button"
                @click="searchApps"
                class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium
                       bg-slate-900 text-amber-100 border border-slate-900
                       shadow-[2px_2px_0_rgba(15,23,42,0.3)] transition-transform
                       hover:-translate-y-[1px] active:translate-y-0
                       disabled:opacity-60 disabled:cursor-not-allowed w-full"
                :disabled="searchLoading"
              >
                <span v-if="!searchLoading">Search</span>
                <span v-else>Searching…</span>
              </button>
            </div>
          </div>

          <p
            v-if="searchError"
            class="mt-3 text-xs text-red-500 flex items-center gap-1"
          >
            <span>⚠️</span>{{ searchError }}
          </p>

          <div
            class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            v-if="searchResults.length"
          >
            <div
              v-for="app in searchResults"
              :key="app.appId"
              class="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3
                     hover:bg-amber-50 transition-colors"
            >
              <img
                :src="app.icon"
                :alt="app.title"
                class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 space-y-0.5 min-w-0">
                    <h3 class="text-xs font-semibold text-slate-900 truncate">
                      {{ app.title }}
                    </h3>
                    <p class="text-[10px] text-slate-600 truncate">
                      {{ app.developer }}
                    </p>
                  </div>
                  <span
                    class="text-[11px] text-slate-800 whitespace-nowrap flex-shrink-0
                           px-1.5 py-[1px] bg-white border border-slate-200 rounded"
                  >
                    ⭐ {{ app.rating ? app.rating.toFixed(1) : 'N/A' }}
                  </span>
                </div>

                <p class="text-[10px] text-slate-700 mt-1">
                  {{ app.free ? 'Free' : (app.currency || '$') + app.price }}
                </p>

                <div class="mt-1.5 flex items-center justify-between">
                  <div class="min-w-0 flex-1 pr-2">
                    <code
                      class="text-[9px] px-2 py-[2px] rounded-full bg-white border border-slate-200 text-slate-500 truncate inline-block max-w-full"
                    >
                      {{ app.appId }}
                    </code>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0 text-[10px]">
                    <a
                      :href="app.url"
                      target="_blank"
                      class="text-sky-600 hover:text-sky-500"
                    >
                      View →
                    </a>
                    <span class="text-slate-300">|</span>
                    <button
                      type="button"
                      class="text-slate-700 underline-offset-2 hover:underline"
                      @click="inspectFromSearch(app)"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p
            v-if="!searchLoading && !searchResults.length && !searchError"
            class="mt-4 text-[11px] text-slate-500 flex items-center gap-1"
          >
            <span>🔍</span>
            No search results yet – try a keyword like
            <span class="font-medium text-slate-600 ml-1">"habit"</span> or
            <span class="font-medium text-slate-600 ml-1">"ai chat"</span>.
          </p>
        </section>
      </div>
    </div>

    <ReviewsModal
      :show="showReviewsModal"
      :appId="appResult?.appId"
      :id="appResult?.id"
      :store="selectedStore"
      :initialCountry="country"
      @close="showReviewsModal = false"
    />
  </div>
</template>
