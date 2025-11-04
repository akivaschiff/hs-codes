<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-4">Understanding HS Codes</h1>
          <p class="text-xl text-blue-100">The universal language of international trade</p>
        </div>
        <div class="text-6xl">
          <img src="/ship.png" alt="ship" class="h-24 w-auto" />
        </div>
      </div>
    </div>

    <!-- What are HS Codes -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">What are HS Codes?</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <p class="text-lg text-gray-700 mb-4">
            The <strong>Harmonized System (HS)</strong> is an internationally standardized system of names and numbers used to classify traded products.
          </p>
          <p class="text-lg text-gray-700 mb-4">
            Created by the World Customs Organization (WCO), it's used by over 200 countries and covers more than 98% of world trade.
          </p>
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-6">
            <p class="text-sm font-semibold text-blue-900 mb-2">🌍 Universal Standard</p>
            <p class="text-sm text-blue-800">
              When you ship goods internationally, customs officials use HS codes to determine tariffs, taxes, and regulations.
            </p>
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Why HS Codes Matter</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-2xl mr-3">💰</span>
              <div>
                <strong class="text-gray-900">Calculate Duties & Taxes</strong>
                <p class="text-gray-600 text-sm">Determine import/export costs</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-2xl mr-3">📊</span>
              <div>
                <strong class="text-gray-900">Trade Statistics</strong>
                <p class="text-gray-600 text-sm">Track global commerce trends</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-2xl mr-3">🔍</span>
              <div>
                <strong class="text-gray-900">Compliance & Regulations</strong>
                <p class="text-gray-600 text-sm">Ensure legal requirements are met</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-2xl mr-3">🤝</span>
              <div>
                <strong class="text-gray-900">Trade Agreements</strong>
                <p class="text-gray-600 text-sm">Apply preferential tariff rates</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- How HS Codes Work - The Hierarchy -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">How HS Codes Work: The Hierarchy</h2>
      <p class="text-lg text-gray-700 mb-8">
        HS codes are built like a pyramid, starting broad and getting more specific with each level:
      </p>

      <!-- Visual Pyramid -->
      <div class="mb-8">
        <div class="max-w-3xl mx-auto">
          <!-- Level 1: Sections -->
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg p-6 mb-2">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-semibold opacity-90">Level 1</div>
                <div class="text-2xl font-bold">21 Sections</div>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-90">Broadest Categories</div>
                <div class="text-lg font-semibold">e.g., "Live Animals"</div>
              </div>
            </div>
          </div>

          <!-- Level 2: Chapters -->
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 mb-2 ml-8">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-semibold opacity-90">Level 2</div>
                <div class="text-2xl font-bold">97 Chapters (2 digits)</div>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-90">Product Groups</div>
                <div class="text-lg font-semibold font-mono">08 - Edible Fruits</div>
              </div>
            </div>
          </div>

          <!-- Level 3: Headings -->
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 mb-2 ml-16">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-semibold opacity-90">Level 3</div>
                <div class="text-2xl font-bold">1,229 Headings (4 digits)</div>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-90">Specific Products</div>
                <div class="text-lg font-semibold font-mono">0808 - Apples & Pears</div>
              </div>
            </div>
          </div>

          <!-- Level 4: Subheadings -->
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-b-lg p-6 ml-24">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-semibold opacity-90">Level 4</div>
                <div class="text-2xl font-bold">5,613 Subheadings (6 digits)</div>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-90">Most Specific</div>
                <div class="text-lg font-semibold font-mono">080810 - Fresh Apples</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Example Breakdown -->
      <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 border-2 border-blue-200">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Example: Fresh Apples</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="bg-white rounded-lg p-4 shadow">
            <div class="text-center mb-3">
              <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">SECTION II</span>
            </div>
            <div class="text-sm text-gray-600 text-center">Vegetable Products</div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <div class="text-center mb-3">
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold font-mono rounded">08</span>
            </div>
            <div class="text-sm text-gray-600 text-center">Edible Fruit and Nuts</div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <div class="text-center mb-3">
              <span class="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-bold font-mono rounded">0808</span>
            </div>
            <div class="text-sm text-gray-600 text-center">Apples, Pears, Quinces</div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow border-2 border-orange-300">
            <div class="text-center mb-3">
              <span class="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-sm font-bold font-mono rounded">080810</span>
            </div>
            <div class="text-sm text-gray-600 text-center font-semibold">Fresh Apples</div>
          </div>
        </div>
        <div class="mt-6 text-center">
          <div class="inline-flex items-center bg-white px-6 py-3 rounded-lg shadow">
            <span class="text-gray-600 mr-3">Final HS Code:</span>
            <span class="text-3xl font-bold font-mono text-gray-900">080810</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Structure -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Breaking Down the Code</h2>
      <div class="max-w-2xl mx-auto">
        <div class="bg-gray-900 rounded-lg p-8 text-white mb-6">
          <div class="text-center mb-4 text-gray-400 text-sm font-semibold">6-DIGIT HS CODE STRUCTURE</div>
          <div class="flex justify-center items-center space-x-2 text-6xl font-mono font-bold">
            <span class="bg-blue-600 px-4 py-2 rounded">0</span>
            <span class="bg-blue-600 px-4 py-2 rounded">8</span>
            <span class="bg-green-600 px-4 py-2 rounded">0</span>
            <span class="bg-green-600 px-4 py-2 rounded">8</span>
            <span class="bg-orange-600 px-4 py-2 rounded">1</span>
            <span class="bg-orange-600 px-4 py-2 rounded">0</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="font-mono font-bold text-blue-700">08</span>
              </div>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-900">Chapter (Digits 1-2)</h4>
              <p class="text-gray-600">Identifies the broad product category</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="font-mono font-bold text-green-700">08</span>
              </div>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-900">Heading (Digits 3-4)</h4>
              <p class="text-gray-600">Narrows to specific product type</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="font-mono font-bold text-orange-700">10</span>
              </div>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-gray-900">Subheading (Digits 5-6)</h4>
              <p class="text-gray-600">Most specific classification</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Global Impact -->
    <div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-200">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Global Impact</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg p-6 shadow-sm text-center">
          <div class="text-4xl font-bold text-blue-600 mb-2">200+</div>
          <div class="text-gray-600">Countries Using HS</div>
        </div>
        <div class="bg-white rounded-lg p-6 shadow-sm text-center">
          <div class="text-4xl font-bold text-blue-600 mb-2">98%</div>
          <div class="text-gray-600">Of World Trade Covered</div>
        </div>
        <div class="bg-white rounded-lg p-6 shadow-sm text-center">
          <div class="text-4xl font-bold text-blue-600 mb-2">5,600+</div>
          <div class="text-gray-600">Product Classifications</div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Explore?</h2>
      <p class="text-xl text-blue-100 mb-6">Browse through thousands of HS codes and discover how products are classified</p>
      <RouterLink
        to="/explorer"
        class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        Start Exploring →
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
