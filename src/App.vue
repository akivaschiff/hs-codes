<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-gray-900">HS Codes Explorer</h1>
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
            to="/lookup"
            class="border-b-2 px-3 py-4 text-sm font-medium transition-colors"
            :class="$route.path === '/lookup' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Product Lookup
          </RouterLink>
          <RouterLink
            to="/game"
            class="border-b-2 px-3 py-4 text-sm font-medium transition-colors"
            :class="$route.path === '/game' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Game
          </RouterLink>
          <RouterLink
            to="/summary"
            class="border-b-2 px-3 py-4 text-sm font-medium transition-colors"
            :class="$route.path === '/summary' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Summary
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
