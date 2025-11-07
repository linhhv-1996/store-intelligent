<template>
  <div class="max-w-[60rem] mx-auto px-4 py-8 space-y-6">
    <div
      class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4"
    >
      <h1
        class="text-2xl font-bold text-slate-900 font-tech uppercase tracking-wider"
      >
        Privacy Policy
      </h1>

      <div class="text-sm text-slate-700 space-y-3">
        <p class="text-xs text-slate-500">Last updated: November 7, 2025</p>

        <p>
          We respect your privacy. This policy explains what information we (do
          not) collect when you use this tool.
        </p>

        <h2 class="text-lg font-semibold text-slate-800 pt-3">
          1. Information We Do Not Collect
        </h2>
        <ul class="list-disc list-outside pl-5 space-y-1">
          <li>
            We do not collect any personal identifiable information (PII) such
            as your name, email address, or phone number.
          </li>
          <li>We do not use cookies for tracking or user sessions.</li>
          <li>
            We do not store your search queries, app IDs, or the results of
            your lookups.
          </li>
        </ul>

        <h2 class="text-lg font-semibold text-slate-800 pt-3">
          2. Server Logs
        </h2>
        <ul class="list-disc list-outside pl-5 space-y-1">
          <li>
            Our web server may automatically log standard information, such as
            your IP address, browser type, and the time of your request.
          </li>
          <li>
            This information is used solely for the purpose of monitoring
            server performance, diagnosing technical issues, and ensuring
            security. It is not shared with any third parties and is deleted
            regularly.
          </li>
        </ul>

        <h2 class="text-lg font-semibold text-slate-800 pt-3">
          3. Third-Party Data
        </h2>
        <ul class="list-disc list-outside pl-5 space-y-1">
          <li>
            This tool interacts with Apple and Google APIs to fetch public app
            data. We do not control and are not responsible for the privacy
            practices of these third parties.
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
  title: 'Privacy Policy - Store Intelligence'
})
</script>
