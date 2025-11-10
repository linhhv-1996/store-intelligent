<template>
          <section class="bg-white border border-slate-200 rounded-2xl p-6 shadow-[3px_3px_0_rgba(15,23,42,0.12)] space-y-4">
        <h2 class="text-lg font-semibold text-slate-900">
          About the store sniffer Tool
        </h2>
        <div class="text-sm text-slate-700 space-y-3">
          <p>
            <strong>store sniffer</strong> is an internal tool designed to quickly look up and analyze the performance of any application on the <strong>Apple App Store</strong> and <strong>Google Play Store</strong>. This tool provides a comprehensive overview of key metrics, metadata, and user feedback, helping you make better-informed decisions.
          </p>
          <h3 class="text-base font-semibold text-slate-800 pt-2">
            Key Features
          </h3>
          <ul class="list-disc list-outside pl-5 space-y-1">
            <li>
              <strong>App Lookup:</strong> Easily view detailed information using an App ID (like <code>com.facebook.Facebook</code>) or a numeric ID (for the App Store). Instantly fetch data on ratings, review counts, metadata (description, release notes, version, size), OS requirements, and developer details.
            </li>
            <li>
              <strong>Keyword Search:</strong> Analyze the market or find competitors by searching for apps related to specific keywords across different countries (US, UK, CAN, DE, JP, VN...).
            </li>
            <li>
              <strong>Review Analysis:</strong> View the latest user reviews for any app, filtering by country to understand user feedback and common issues.
            </li>
          </ul>
          <p>
            This tool utilizes <code>app-store-scraper</code> and <code>google-play-scraper</code> to fetch the latest public data directly from the app stores.
          </p>
        </div>
      </section>
</template>
