<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-gray-900">TradeAtlas</h1>
        <p class="text-sm text-gray-600 mt-1">Making international trade codes accessible to everyone</p>
      </div>
    </header>

    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <RouterLink
            to="/explorer"
            class="border-b-2 px-3 py-4 text-sm font-medium transition-colors"
            :class="$route.path === '/explorer' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Explorer
          </RouterLink>
          <RouterLink
            to="/summary"
            class="border-b-2 px-3 py-4 text-sm font-medium transition-colors"
            :class="$route.path === '/summary' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            About HS Codes
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      <RouterView />
    </main>

    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">About TradeAtlas</h3>
            <p class="text-gray-600 mb-3">
              We work in the field of international trade with a mission to modernize how professionals and newcomers alike navigate the complex world of customs classifications and HS codes.
            </p>
            <p class="text-gray-600">
              Our goal is to make trade data more accessible, understandable, and useful for businesses of all sizes—from small exporters to global logistics providers.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Simplify complex trade regulations for everyone</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Provide free, accessible tools for trade classification</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Bridge the knowledge gap between experts and beginners</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Modernize the international trade ecosystem</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 TradeAtlas. Helping make global trade more accessible.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
