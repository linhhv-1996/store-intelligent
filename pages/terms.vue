<template>
  <div class="max-w-[60rem] mx-auto px-4 py-8 space-y-6">
    <div
      class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4"
    >
      <h1
        class="text-2xl font-bold text-slate-900 font-tech uppercase tracking-wider"
      >
        Terms of Use & Disclaimer
      </h1>

      <div class="text-sm text-slate-700 space-y-3">
        <p class="text-xs text-slate-500">Last updated: November 7, 2025</p>

        <p>
          This Store Intelligence tool ("the Tool") is provided for internal
          informational and reference purposes only.
        </p>

        <h2 class="text-lg font-semibold text-slate-800 pt-3">
          1. Data Source and Accuracy
        </h2>
        <ul class="list-disc list-outside pl-5 space-y-1">
          <li>
            All data provided by the Tool is scraped from publicly available
            pages on the Apple App Store and the Google Play Store.
          </li>
          <li>
            We do not guarantee the accuracy, timeliness, completeness, or
            availability of any information provided. Data may be delayed,
            inaccurate, or incomplete.
          </li>
        </ul>

        <h2 class="text-lg font-semibold text-slate-800 pt-3">
          2. No Affiliation
        </h2>
        <ul class="list-disc list-outside pl-5 space-y-1">
          <li>
            This Tool is not affiliated with, sponsored by, or endorsed by
            Apple Inc. or Google LLC.
          </li>
          <li>
            "App Store" is a trademark of Apple Inc. "Google Play" and the
            Google Play logo are trademarks of Google LLC.
          </li>
        </ul>

        <h2 class="text-lg font-semibold text-slate-800 pt-3">
          3. Limitation of Liability
        </h2>
        <ul class="list-disc list-outside pl-5 space-y-1">
          <li>
            You assume all responsibility and risk for the use of this Tool
            and the data it provides.
          </li>
          <li>
            In no event shall the creators of this Tool be liable for any
            direct, indirect, incidental, or consequential damages arising out
            of or in connection with the use of, or inability to use, this
            Tool.
          </li>
          <li>
            It is your responsibility to ensure that your use of this data
            complies with the terms of service of both Apple and Google.
          </li>
        </ul>

        <p class="pt-6">
          <NuxtLink
            to="/"
            class="text-sky-600 font-medium hover:underline"
            >&larr; Back to the tool</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Terms of Use - Store Intelligence'
})
</script>
