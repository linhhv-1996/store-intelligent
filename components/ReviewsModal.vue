<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch } from 'vue'

// --- Props & Emits ---
const props = defineProps<{
  show: boolean
  appId: string | undefined
  id: number | undefined
  store: 'apple' | 'google'
  initialCountry: string
}>()

const emit = defineEmits(['close'])

// --- STATE NỘI BỘ CỦA MODAL ---
const selectedCountry = ref(props.initialCountry)
const reviews = ref<any[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')
const allReviewsLoaded = ref(false)

const currentPage = ref(1) // Cho Apple
const nextPageToken = ref<string | null>(null) // Cho Google

// --- Watcher ---

// Khi modal được mở, fetch data lần đầu
watch(() => props.show, (newVal) => {
  if (newVal) {
    selectedCountry.value = props.initialCountry
    fetchInitialReviews()
  }
})

// Khi đổi country -> fetch lại từ trang 1
watch(selectedCountry, () => {
  fetchInitialReviews()
})

// --- Functions ---

const fetchReviewsData = async (isLoadMore = false) => {
  if (!props.appId && !props.id) {
    error.value = 'Missing App ID'
    return
  }

  // Phân biệt state loading
  if (!isLoadMore) {
    loading.value = true
    reviews.value = [] // Reset list
    allReviewsLoaded.value = false
    currentPage.value = 1 // Reset state Apple
    nextPageToken.value = null // Reset state Google
  } else {
    loadingMore.value = true
  }
  error.value = ''
  
  try {
    const params: Record<string, any> = {
      appId: props.appId,
      id: props.id,
      country: selectedCountry.value,
      store: props.store
    }
    
    // [FIX] Lưu lại token SẼ DÙNG để so sánh
    let tokenSent: string | null = null 

    if (props.store === 'google') {
      if (isLoadMore && nextPageToken.value) {
        params.token = nextPageToken.value
        tokenSent = nextPageToken.value // Ghi lại token đã gửi
      }
    } else {
      params.page = String(currentPage.value)
    }

    // @ts-ignore
    const data = await $fetch('/api/reviews', { params })

    if ((data as any).error) {
      throw new Error((data as any).error)
    }
    
    const newReviews = (data as any).reviews || []
    
    if (isLoadMore) {
      reviews.value.push(...newReviews) // Nối vào list cũ
    } else {
      reviews.value = newReviews // Ghi đè list
    }
    
    // [FIX] Check nếu không còn review trả về (Áp dụng cho CẢ HAI store)
    if (newReviews.length === 0) {
      allReviewsLoaded.value = true
      return // Stop
    }
    
    // Xử lý state phân trang tiếp theo
    if (props.store === 'google') {
      const newNextToken = (data as any).nextPageToken || null
      
      // [FIX] Check 3 trường hợp:
      // 1. Token mới là null
      // 2. Token mới trả về GIỐNG HỆT token vừa gửi đi (lỗi ông nói)
      if (!newNextToken || (isLoadMore && newNextToken === tokenSent)) {
        allReviewsLoaded.value = true
      } else {
        // Nó là 1 token mới hợp lệ
        nextPageToken.value = newNextToken
      }
    } else {
      // Apple: Tăng page lên cho lần fetch tiếp theo
      currentPage.value += 1
    }

  } catch (e: any) {
    error.value = e.message || 'Cannot load reviews'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

// Gọi hàm này khi muốn reset (mở modal, đổi country)
const fetchInitialReviews = () => {
  fetchReviewsData(false) // Fetch trang 1
}

// Gọi hàm này khi click "Load More"
const loadMoreReviews = () => {
  if (loading.value || loadingMore.value || allReviewsLoaded.value) return
  fetchReviewsData(true) // Fetch trang tiếp theo
}

// --- Helpers ---
const ratingStars = (score: any) => {
  const num = Math.round(Number(score) || 0)
  const s = Math.min(Math.max(num, 0), 5)
  return '★'.repeat(s) + '☆'.repeat(5 - s)
}

const platformName = computed(() => {
  return props.store === 'apple' ? 'App Store' : 'Google Play'
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-2xl max-h-[80vh] bg-white rounded-xl shadow-lg shadow-slate-900/10 border border-slate-200 flex flex-col"
      >
        <div
          class="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3"
        >
          <div class="flex-1">
            <p class="text-sm font-semibold text-slate-900">Recent reviews</p>
            <p class="text-[11px] text-slate-500">
              Recent reviews from {{ platformName }}
            </p>
          </div>
          
          <div class="flex items-center gap-3">
              <select
              v-model="selectedCountry"
              class="rounded-lg bg-slate-100 border border-slate-200 px-2 py-1 text-xs
                      focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              :disabled="loading || loadingMore"
            >
              <option value="us">US</option>
              <option value="vn">VN</option>
              <option value="gb">UK</option>
              <option value="jp">JP</option>
              <option value="de">DE</option>
            </select>

            <button
              type="button"
              @click="emit('close')"
              class="text-[11px] text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs">
          <p v-if="loading" class="text-slate-500 text-center py-8">Loading reviews...</p>
          <p v-else-if="error" class="text-red-500 p-4 bg-red-50 rounded-lg">
            <strong>Error:</strong> {{ error }}
          </p>
          <p v-else-if="!reviews.length" class="text-slate-500 text-center py-8">
            No reviews found for {{ selectedCountry.toUpperCase() }}.
          </p>

          <template v-else>
            <div
              v-for="(rev, index) in reviews"
              :key="rev.id || `gg-${index}`" 
              class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="text-[11px] font-semibold text-slate-900">
                    {{ rev.userName || 'Anonymous' }}
                  </p>
                  <p class="text-[10px] text-amber-500/90">
                    {{ ratingStars(rev.score) }}
                    <span class="text-[10px] text-slate-500">
                      ({{ rev.score }}/5)
                    </span>
                  </p>
                </div>
                <p class="text-[10px] text-slate-400 text-right">
                  {{ rev.date || '' }}<br />
                  <span v-if="rev.version" class="text-[10px]">
                    v{{ rev.version }}
                  </span>
                </p>
              </div>
              <p
                v-if="rev.title"
                class="mt-1 text-[11px] font-medium text-slate-900"
              >
                {{ rev.title }}
              </p>
              <p class="mt-0.5 text-[11px] text-slate-700 whitespace-pre-line">
                {{ rev.text }}
              </p>
              <a
                v-if="rev.url"
                :href="rev.url"
                target="_blank"
                class="mt-1 inline-flex text-[10px] text-sky-600 hover:text-sky-500"
              >
                View on {{ platformName }} →
              </a>
            </div>
          </template>
        </div>

        <div
          v-if="!loading && !error && reviews.length > 0"
          class="px-4 py-2 border-t border-slate-200 text-center"
        >
          <button
            v-if="!allReviewsLoaded"
            type="button"
            @click="loadMoreReviews"
            :disabled="loadingMore"
            class="text-xs text-sky-600 hover:text-sky-500 font-medium disabled:opacity-50 disabled:cursor-wait"
          >
            {{ loadingMore ? 'Loading...' : 'Load More Reviews' }}
          </button>
          <p v-else class="text-[11px] text-slate-400">
            All reviews loaded.
          </p>
        </div>
        
      </div>
    </div>
  </transition>
</template>

<style>
/* Thêm transition cho modal, v-if không có transition mặc định */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
