<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  show: boolean
  reviews: any[]
  loading: boolean
  error: string
  country: string
  store: 'apple' | 'google'
}>()

const emit = defineEmits(['close'])

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
          <div>
            <p class="text-sm font-semibold text-slate-900">Recent reviews</p>
            <p class="text-[11px] text-slate-500">
              Top {{ reviews.length || 0 }} most recent reviews from {{ platformName }}
              ({{ country.toUpperCase() }})
            </p>
          </div>
          <button
            type="button"
            @click="emit('close')"
            class="text-[11px] text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-xs">
          <p v-if="loading" class="text-slate-500">Loading reviews...</p>
          <p v-else-if="error" class="text-red-500">
            {{ error }}
          </p>
          <p v-else-if="!reviews.length" class="text-slate-500">
            No reviews found.
          </p>

          <div
            v-for="rev in reviews"
            :key="rev.id"
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
