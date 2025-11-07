<template>
  <header
    class="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20"
  >
    <div
      class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3"
    >
      <!-- Left: text logo -->
      <div class="flex flex-col gap-1">
        <span
          class="inline-flex w-fit items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em]
                 text-slate-700"
        >
          Store Intelligence
        </span>
        <h1
          class="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold tracking-tight text-slate-900
                 px-2 py-1 rounded-lg bg-amber-50 border border-slate-900/25
                 shadow-[2px_2px_0_rgba(15,23,42,0.12)]"
        >
          Quick performance & meta check for any app
        </h1>
        <p class="text-[11px] text-slate-500 max-w-md">
          Internal spy tool for your app studio – App Store & Google Play in one place.
        </p>
      </div>

      <!-- Right: data source -->
      <div class="hidden sm:flex items-center gap-4 text-[11px] text-slate-500">
        <span class="hidden md:inline">
          Data source: public store pages
        </span>
        <span class="flex flex-wrap items-center gap-1">
          <code
            class="px-1.5 py-[2px] rounded-full bg-slate-50 border border-slate-200 text-[10px] text-slate-700"
          >
            app-store-scraper
          </code>
          <code
            class="px-1.5 py-[2px] rounded-full bg-slate-50 border border-slate-200 text-[10px] text-slate-700"
          >
            google-play-scraper
          </code>
        </span>
      </div>
    </div>
  </header>
</template>
