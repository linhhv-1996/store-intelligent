<template>
  <footer class="max-w-[60rem] mx-auto px-4 py-6 text-center">
    <div class="text-xs text-slate-500 space-y-1">
      <p>
        Store Intelligent Tool &copy; {{ new Date().getFullYear() }}. All data from
        public App Store & Google Play.
      </p>
      <div class="flex items-center justify-center gap-3">
        <NuxtLink to="/terms" class="hover:text-slate-700 hover:underline">
          Terms of Use
        </NuxtLink>
        <span class="text-slate-300">|</span>
        <NuxtLink to="/privacy" class="hover:text-slate-700 hover:underline">
          Privacy Policy
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
