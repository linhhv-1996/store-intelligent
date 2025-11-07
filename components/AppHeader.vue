<template>
  <header
    class="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20"
  >
    <div
      class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3"
    >
      <div class="flex items-center gap-3">
        <div
          class="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500/10 via-sky-400/5 to-indigo-400/10 flex items-center justify-center border border-sky-200"
        >
          <span class="text-base">🛍️</span>
        </div>
        <div>
          <h1 class="text-[15px] font-semibold tracking-tight text-slate-900">
            Store Intelligence
          </h1>
          <p class="text-[11px] text-slate-500">
            Internal spy tool for your app studio – quick performance & meta
            check for any app.
          </p>
        </div>
      </div>
      <div class="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
        <span class="hidden md:inline">
          Data source: public store pages
        </span>
        <span>
          <code class="text-slate-600">app-store-scraper</code>
          <code class="text-slate-600 ml-1">google-play-scraper</code>
        </span>
      </div>
    </div>
  </header>
</template>
