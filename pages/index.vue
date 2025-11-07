<script setup lang="ts">
import { ref } from 'vue'
import ReviewsModal from '~/components/ReviewsModal.vue'

// --- STATE ---

// Tab state
const activeTab = ref<'lookup' | 'search'>('lookup')

// App Lookup state
const appId = ref('')
const country = ref('us')
const appResult = ref<any | null>(null)
const appError = ref('')
const appLoading = ref(false)

// Keyword Search state
const searchTerm = ref('')
const searchCountry = ref('us')
const searchResults = ref<any[]>([])
const searchError = ref('')
const searchLoading = ref(false)

// Reviews modal state
const showReviewsModal = ref(false)
const reviews = ref<any[]>([])
const reviewsLoading = ref(false)
const reviewsError = ref('')
const reviewsPage = ref(1)

// --- HELPERS ---

const prettySize = (raw: any) => {
  if (!raw) return '—'
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
  if (!n || Number.isNaN(n)) return '0'
  return n.toLocaleString()
}

// --- FUNCTIONS ---

const checkApp = async () => {
  appError.value = ''
  appResult.value = null

  const value = appId.value.trim()
  if (!value) {
    appError.value = 'Enter an appId or numeric App Store ID'
    return
  }

  appLoading.value = true
  try {
    const isNumeric = /^\d+$/.test(value)
    const params: Record<string, string> = { country: country.value }
    if (isNumeric) params.id = value
    else params.appId = value

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
  reviewsError.value = ''
  reviews.value = []
  reviewsPage.value = 1
  showReviewsModal.value = true
  reviewsLoading.value = true
  try {
    // @ts-ignore
    const data = await $fetch('/api/reviews', {
      params: {
        appId: appResult.value.appId,
        country: country.value,
        page: String(reviewsPage.value)
      }
    })

    if ((data as any).error) {
      reviewsError.value = (data as any).error
    } else {
      reviews.value = (data as any).reviews || []
    }
  } catch (e) {
    reviewsError.value = 'Cannot load reviews'
  } finally {
    reviewsLoading.value = false
  }
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
      params: { term, country: searchCountry.value, limit: '12' }
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
</script>

<template>
  <div>
    <div class="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="activeTab = 'lookup'"
          :class="[
            'rounded-xl px-4 py-2 text-sm font-medium transition',
            activeTab === 'lookup'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          ]"
        >
          App Lookup
        </button>
        <button
          type="button"
          @click="activeTab = 'search'"
          :class="[
            'rounded-xl px-4 py-2 text-sm font-medium transition',
            activeTab === 'search'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          ]"
        >
          Keyword Search
        </button>
      </div>

      <div v-if="activeTab === 'lookup'" class="space-y-6">
        <section
          class="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 px-5 py-5 shadow-sm shadow-slate-100"
        >
          <div
            class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-100/60"
          />
          <div
            class="absolute -right-24 top-6 h-40 w-40 rounded-full bg-indigo-100/40"
          />

          <div class="relative flex flex-col lg:flex-row gap-6">
            <div class="flex-1 space-y-4">
              <div>
                <p
                  class="text-[11px] uppercase tracking-[0.18em] text-sky-600 font-medium"
                >
                  App lookup
                </p>
                <h2 class="text-xl font-semibold text-slate-900 mt-1">
                  Check detailed metrics for a single app
                </h2>
                <p class="text-sm text-slate-500 mt-1 max-w-xl">
                  Paste an <span class="font-medium">appId</span> or numeric
                  <span class="font-medium">App Store ID</span>. Get rating,
                  reviews count, pricing, content rating, languages, size and
                  more.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-end gap-3 mt-3">
                <div class="flex-1 space-y-1.5">
                  <label class="text-[11px] font-medium text-slate-700">
                    appId or numeric App Store ID
                  </label>
                  <input
                    v-model="appId"
                    type="text"
                    placeholder="com.your.app or 1234567890"
                    class="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div class="space-y-1.5 w-full sm:w-32">
                  <label class="text-[11px] font-medium text-slate-700">
                    Country
                  </label>
                  <select
                    v-model="country"
                    class="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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
                  class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
                         bg-slate-900 hover:bg-slate-800 text-white transition
                         disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                  :disabled="appLoading"
                >
                  <span v-if="!appLoading">Run lookup</span>
                  <span v-else>Checking…</span>
                </button>
              </div>

              <p class="text-[10px] text-slate-400 mt-1.5">
                Example: <code>com.facebook.Facebook</code> or
                <code>284882215</code>
              </p>

              <p v-if="appError" class="mt-2 text-xs text-red-500">
                {{ appError }}
              </p>
            </div>

            <div
              class="w-full lg:w-64 rounded-xl bg-white/80 border border-slate-200 px-3.5 py-3 text-[11px] text-slate-600 backdrop-blur flex flex-col gap-2"
            >
              <p class="text-[11px] font-medium text-slate-700">Snapshot</p>
              <div v-if="appResult" class="space-y-2">
                <div class="flex items-center gap-3">
                  <img
                    :src="appResult.icon"
                    :alt="appResult.title"
                    class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 object-cover"
                  />
                  <div class="truncate">
                    <p class="text-xs font-semibold text-slate-900 truncate">
                      {{ appResult.title }}
                    </p>
                    <p class="text-[10px] text-slate-500 truncate">
                      {{ appResult.developer }}
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mt-1">
                  <div class="space-y-0.5">
                    <p class="text-[10px] text-slate-500">Rating</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ appResult.rating ?? 'N/A' }}
                      <span class="text-[10px] text-slate-400">/ 5</span>
                    </p>
                  </div>
                  <div class="space-y-0.5">
                    <p class="text-[10px] text-slate-500">Total reviews</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ formatNumber(appResult.ratingCount) }}
                    </p>
                  </div>
                  <div class="space-y-0.5">
                    <p class="text-[10px] text-slate-500">Price</p>
                    <p class="text-sm font-semibold text-slate-900">
                      <span v-if="appResult.free" class="text-emerald-600"
                        >Free</span
                      >
                      <span v-else>
                        {{ appResult.currency || '$' }}{{ appResult.price }}
                      </span>
                    </p>
                  </div>
                  <div class="space-y-0.5">
                    <p class="text-[10px] text-slate-500">Content rating</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ appResult.contentRating || '—' }}
                    </p>
                  </div>
                </div>
                <p
                  class="pt-2 mt-1 border-t border-slate-200 text-[10px] text-slate-400"
                >
                  Exact download numbers are not exposed by Apple. Use reviews +
                  rankings as proxies.
                </p>
              </div>

              <div v-else class="text-[11px] text-slate-500">
                No app selected yet. Run a lookup to see rating & review stats.
              </div>
            </div>
          </div>
        </section>

        <section v-if="appResult" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div
            class="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-100"
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
                    class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px] text-[10px] uppercase tracking-wide text-slate-500"
                  >
                    {{ appResult.genre }}
                  </span>
                </div>
                <p class="text-xs text-slate-500">
                  {{ appResult.developer }}
                </p>

                <div class="!mt-3 flex flex-wrap items-center gap-3">
                  <a
                    :href="appResult.url"
                    target="_blank"
                    class="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-500"
                  >
                    Open in App Store →
                  </a>
                  <button
                    v-if="appResult.ratingCount && appResult.ratingCount > 0"
                    type="button"
                    @click="openReviews"
                    class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 hover:bg-slate-100"
                  >
                    View recent reviews
                  </button>
                </div>

                <div
                  class="!mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-3 max-w-md"
                >
                  <div>
                    <p class="text-[10px] text-slate-500">Rating</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ appResult.rating ?? 'N/A' }}
                      <span class="text-[10px] text-slate-400">/ 5</span>
                    </p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">Total reviews</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ formatNumber(appResult.ratingCount) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-500">Size</p>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ prettySize(appResult.size) }}
                    </p>
                  </div>
                </div>

                <div class="!mt-3 flex flex-wrap gap-2">
                  <span
                    v-if="appResult.free"
                    class="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-[2px] text-[10px] font-medium"
                  >
                    Free
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center rounded-full bg-slate-900 text-white px-2 py-[2px] text-[10px] font-medium"
                  >
                    {{ appResult.currency || '$' }}{{ appResult.price }}
                  </span>
                  <span
                    v-if="appResult.contentRating"
                    class="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-[2px] text-[10px]"
                  >
                    {{ appResult.contentRating }}
                  </span>
                  <span
                    v-if="appResult.requiredOsVersion"
                    class="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-[2px] text-[10px]"
                  >
                    iOS {{ appResult.requiredOsVersion }}+
                  </span>
                </div>

                <p
                  class="!mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400"
                >
                  ID: <span class="text-slate-600">{{ appResult.id }}</span>
                  · appId:
                  <span class="text-slate-600">{{ appResult.appId }}</span>
                </p>
              </div>
            </div>

            <div class="border-t border-slate-200 pt-3 mt-2">
              <h3
                class="text-[11px] font-semibold text-slate-700 uppercase tracking-[0.16em] mb-2"
              >
                Description
              </h3>
              <p
                class="text-xs text-slate-700 whitespace-pre-line max-h-64 overflow-y-auto pr-1"
              >
                {{ appResult.description }}
              </p>
            </div>

            <div
              v-if="appResult.releaseNotes"
              class="border-t border-slate-200 pt-3 mt-3"
            >
              <h3
                class="text-[11px] font-semibold text-slate-700 uppercase tracking-[0.16em] mb-1.5"
              >
                Latest release notes
              </h3>
              <p
                class="text-xs text-slate-700 whitespace-pre-line max-h-48 overflow-y-auto pr-1"
              >
                {{ appResult.releaseNotes }}
              </p>
            </div>
          </div>

          <div class="space-y-4">
            <div
              class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-100 text-[11px] text-slate-600 space-y-2"
            >
              <h3
                class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.16em] mb-1"
              >
                Meta & platform
              </h3>
              <div class="flex justify-between">
                <span class="text-slate-500">Primary genre</span>
                <span class="font-medium text-slate-700">
                  {{ appResult.genre || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">All genres</span>
                <span class="text-right max-w-[140px]">
                  {{ appResult.genres?.join(', ') || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Languages</span>
                <span class="text-right max-w-[140px]">
                  {{ joinLanguages(appResult.languages) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Required iOS</span>
                <span class="font-medium text-slate-700">
                  {{ appResult.requiredOsVersion || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Released</span>
                <span class="text-slate-700">
                  {{ appResult.released || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Last updated</span>
                <span class="text-slate-700">
                  {{
                    appResult.updated ||
                    appResult.currentVersionReleaseDate ||
                    '—'
                  }}
                </span>
              </div>
            </div>

            <div
              class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-100 text-[11px] text-slate-600 space-y-2"
            >
              <h3
                class="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.16em] mb-1"
              >
                Developer
              </h3>
              <div class="flex justify-between">
                <span class="text-slate-500">Name</span>
                <span class="text-right max-w-[140px] text-slate-700">
                  {{ appResult.developer || '—' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Developer ID</span>
                <span class="text-right max-w-[140px] text-slate-700">
                  {{ appResult.developerId || '—' }}
                </span>
              </div>
              <div class="mt-2">
                <a
                  v-if="appResult.developerUrl"
                  :href="appResult.developerUrl"
                  target="_blank"
                  class="inline-flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-500"
                >
                  View developer on App Store →
                </a>
                <p v-else class="text-[10px] text-slate-400">
                  No developer URL exposed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-if="activeTab === 'search'">
        <section
          class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm shadow-slate-100"
        >
          <div class="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 class="text-sm font-semibold text-slate-900">
                Keyword search
              </h2>
              <p class="text-xs text-slate-500">
                Find competitors or scan a niche by keyword and country.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 sm:items-end gap-3">
            <div class="col-span-12 sm:col-span-6 space-y-1.5">
              <label class="text-[11px] font-medium text-slate-700">
                Search keyword
              </label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="habit, task manager, ai chat…"
                class="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div class="col-span-12 sm:col-span-3 space-y-1.5">
              <label class="text-[11px] font-medium text-slate-700">
                Country
              </label>
              <select
                v-model="searchCountry"
                class="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="us">US</option>
                <option value="vn">VN</option>
                <option value="gb">UK</option>
                <option value="jp">JP</option>
                <option value="de">DE</option>
              </select>
            </div>

            <div class="col-span-12 sm:col-span-3">
              <button
                type="button"
                @click="searchApps"
                class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
                       bg-slate-900 hover:bg-slate-800 text-white transition
                       disabled:opacity-60 disabled:cursor-not-allowed w-full"
                :disabled="searchLoading"
              >
                <span v-if="!searchLoading">Search</span>
                <span v-else>Searching…</span>
              </button>
            </div>
          </div>
          <p v-if="searchError" class="mt-3 text-xs text-red-500">
            {{ searchError }}
          </p>

          <div
            class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            v-if="searchResults.length"
          >
            <div
              v-for="app in searchResults"
              :key="app.appId"
              class="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 hover:border-sky-200 hover:bg-sky-50/60 transition"
            >
              <img
                :src="app.icon"
                :alt="app.title"
                class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 space-y-0.5 min-w-0">
                    <h3 class="text-xs font-semibold text-slate-900 truncate">
                      {{ app.title }}
                    </h3>
                    <p class="text-[10px] text-slate-500 truncate">
                      {{ app.developer }}
                    </p>
                  </div>
                  <span
                    class="text-[11px] text-slate-600 whitespace-nowrap flex-shrink-0"
                  >
                    ⭐ {{ app.rating ?? 'N/A' }}
                  </span>
                </div>

                <p class="text-[10px] text-slate-600 mt-1">
                  {{ app.free ? 'Free' : '$' + app.price }}
                </p>

                <div class="mt-1 flex items-center gap-2">
                  <div class="min-w-0 flex-1">
                    <code
                      class="text-[9px] px-2 py-[2px] rounded-full bg-white border border-slate-200 text-slate-500 truncate inline-block max-w-full"
                    >
                      {{ app.appId }}
                    </code>
                  </div>
                  <a
                    :href="app.url"
                    target="_blank"
                    class="text-[10px] text-sky-600 hover:text-sky-500 flex-shrink-0"
                  >
                    App Store →
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p
            v-else-if="!searchLoading && !searchError"
            class="mt-3 text-[11px] text-slate-400"
          >
            No search results yet – try a keyword.
          </p>
        </section>
      </div>
    </div>

    <ReviewsModal
      :show="showReviewsModal"
      :reviews="reviews"
      :loading="reviewsLoading"
      :error="reviewsError"
      :country="country"
      @close="showReviewsModal = false"
    />
  </div>
</template>
