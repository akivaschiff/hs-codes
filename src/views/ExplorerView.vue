<template>
  <div class="space-y-6 relative">
    <!-- Backdrop Overlay -->
    <div
      v-if="selectedPath.length > 0"
      @click="clearSelection"
      class="fixed inset-0 z-40 transition-opacity"
      style="background-color: rgba(0, 0, 0, 0.3);"
    ></div>

    <!-- Side Panel -->
    <div
      class="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
      :class="selectedPath.length > 0 ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="h-full flex flex-col">
        <!-- Panel Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-medium opacity-90">Your Selected HS Code</h3>
              <div class="text-4xl font-bold font-mono mt-2">{{ currentCode }}</div>
            </div>
            <button
              @click="clearSelection"
              class="text-white hover:text-gray-200 transition-colors p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-blue-100 mt-2">{{ currentDescription }}</p>
        </div>

        <!-- Panel Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="space-y-6">
            <!-- What is this section -->
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h4 class="text-sm font-semibold text-blue-900 mb-2">💡 Understanding HS Codes</h4>
              <p class="text-sm text-blue-800 mb-3">
                HS (Harmonized System) codes classify products in international trade. Each level gets more specific, from broad categories to exact products.
              </p>
              <div class="relative h-6">
                <img src="/ship.png" alt="ship" class="boat-emoji" />
              </div>
            </div>

            <!-- Hierarchy Breakdown -->
            <div>
              <h4 class="text-base font-bold text-gray-900 mb-4">How This Code Was Built</h4>
              <div class="space-y-4">
                <!-- Level 1: Section -->
                <div v-if="selectedPath[0]" class="border-l-4 border-purple-400 pl-4">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-purple-600 uppercase tracking-wide">Level 1 • Section</span>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ getSectionName(selectedPath[0].description) }}</p>
                  <p class="text-xs text-gray-500 mt-1">Broadest category - one of 21 major product groups</p>
                </div>

                <!-- Level 2: Chapter -->
                <div v-if="selectedPath[1]" class="border-l-4 border-blue-400 pl-4">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">Level 2 • Chapter</span>
                    <span class="text-xs font-mono font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{{ getChapterCode(selectedPath[1].description) }}</span>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ getChapterName(selectedPath[1].description) }}</p>
                  <p class="text-xs text-gray-500 mt-1">First 2 digits - narrows down the product type</p>
                </div>

                <!-- Level 3: Heading -->
                <div v-if="selectedPath[2]" class="border-l-4 border-green-400 pl-4">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-green-600 uppercase tracking-wide">Level 3 • Heading</span>
                    <span class="text-xs font-mono font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">{{ getHeadingCode(selectedPath[2].description) }}</span>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ getHeadingName(selectedPath[2].description) }}</p>
                  <p class="text-xs text-gray-500 mt-1">First 4 digits - more specific product category</p>
                </div>

                <!-- Level 4: Subheading -->
                <div v-if="selectedPath[3]" class="border-l-4 border-orange-400 pl-4">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-orange-600 uppercase tracking-wide">Level 4 • Subheading</span>
                    <span class="text-xs font-mono font-semibold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">{{ currentCode }}</span>
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ selectedPath[3].description }}</p>
                  <p class="text-xs text-gray-500 mt-1">Full 6-digit code - the exact product classification</p>
                </div>
              </div>
            </div>

            <!-- Code Breakdown -->
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Code Breakdown</h4>
              <div class="font-mono text-2xl font-bold text-gray-900 mb-2">
                <span class="text-blue-600">{{ currentCode.slice(0, 2) }}</span><span class="text-green-600">{{ currentCode.slice(2, 4) }}</span><span class="text-orange-600">{{ currentCode.slice(4, 6) }}</span>
              </div>
              <div class="space-y-1 text-xs">
                <div class="flex items-center gap-2">
                  <span class="w-12 h-3 bg-blue-400 rounded"></span>
                  <span class="text-gray-600">Chapter (digits 1-2)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-12 h-3 bg-green-400 rounded"></span>
                  <span class="text-gray-600">Heading (digits 3-4)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-12 h-3 bg-orange-400 rounded"></span>
                  <span class="text-gray-600">Subheading (digits 5-6)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Explorer Tree -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
      <div class="p-4 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">📚 Browse HS Code Hierarchy</h2>
            <p class="text-sm text-gray-600 mt-1">Expand sections to explore chapters, headings, and subheadings</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="expandAll"
              class="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            >
              Expand All
            </button>
            <button
              @click="collapseAll"
              class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="p-8 text-center text-gray-500">
        Loading HS codes...
      </div>

      <div v-else class="p-4 space-y-3">
        <!-- Section Groups -->
        <div v-for="group in sectionGroups" :key="group.name" class="mb-3">
          <button
            @click="toggleGroup(group.name)"
            class="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            :class="{'bg-blue-50 border-blue-300': expandedGroups.has(group.name)}"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <span class="text-2xl flex-shrink-0">{{ group.emoji }}</span>
              <div class="text-left flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <div class="min-w-0 flex-1">
                    <div class="font-semibold text-gray-900 break-words">{{ group.name }}</div>
                    <div class="text-sm text-gray-600 break-words">{{ group.description }}</div>
                  </div>
                  <div class="text-xs text-gray-500 ml-4 flex-shrink-0">{{ group.sectionRange }}</div>
                </div>
              </div>
            </div>
            <svg
              class="w-5 h-5 text-gray-400 transition-transform ml-2 flex-shrink-0"
              :class="{'rotate-180': expandedGroups.has(group.name)}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Sections within group -->
          <Transition name="expand">
            <div v-if="expandedGroups.has(group.name)" class="ml-6 mt-2 space-y-2">
              <div v-for="section in group.sections" :key="section.id" class="mb-2">
              <button
                @click="toggleSection(section.id)"
                class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                :class="{'bg-blue-50 border-blue-300': expandedSections.has(section.id)}"
              >
                <div class="flex items-center space-x-3 flex-1 min-w-0">
                  <span class="text-lg flex-shrink-0">{{ expandedSections.has(section.id) ? '📂' : '📁' }}</span>
                  <div class="text-left flex-1 min-w-0">
                    <div class="font-medium text-gray-900 flex items-center justify-between">
                      <span class="text-sm text-gray-600 break-words">{{ section.description }}</span>
                      <span class="text-xs text-gray-500 ml-2 flex-shrink-0">Section {{ section.id }}</span>
                    </div>
                  </div>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform ml-2 flex-shrink-0"
                  :class="{'rotate-180': expandedSections.has(section.id)}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

          <!-- Chapters -->
          <Transition name="expand">
            <div v-if="expandedSections.has(section.id)" class="ml-8 mt-2 space-y-2">
              <div v-for="chapter in section.chapters" :key="chapter.hscode" class="mb-2">
              <button
                @click="toggleChapter(chapter.hscode)"
                class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                :class="{'bg-blue-50 border-blue-300': expandedChapters.has(chapter.hscode)}"
              >
                <div class="flex items-center space-x-3 flex-1 min-w-0">
                  <span class="text-lg flex-shrink-0">{{ expandedChapters.has(chapter.hscode) ? '📖' : '📕' }}</span>
                  <div class="text-left flex-1 min-w-0">
                    <div class="font-medium text-gray-900">
                      <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm flex-shrink-0">{{ chapter.hscode }}</span>
                      <span class="ml-2 break-words">{{ chapter.description }}</span>
                    </div>
                  </div>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0"
                  :class="{'rotate-180': expandedChapters.has(chapter.hscode)}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Headings -->
              <Transition name="expand">
                <div v-if="expandedChapters.has(chapter.hscode)" class="ml-8 mt-2 space-y-2">
                  <div v-for="heading in chapter.headings" :key="heading.hscode" class="mb-2">
                  <button
                    @click="toggleHeading(heading.hscode)"
                    class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    :class="{'bg-blue-50 border-blue-300': expandedHeadings.has(heading.hscode)}"
                  >
                    <div class="flex items-center space-x-3 flex-1 min-w-0">
                      <span class="text-base flex-shrink-0">{{ expandedHeadings.has(heading.hscode) ? '📄' : '📃' }}</span>
                      <div class="text-left flex-1 min-w-0">
                        <div class="text-sm font-medium text-gray-900">
                          <span class="font-mono bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">{{ heading.hscode }}</span>
                          <span class="ml-2 break-words">{{ heading.description }}</span>
                        </div>
                      </div>
                    </div>
                    <svg
                      class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0"
                      :class="{'rotate-180': expandedHeadings.has(heading.hscode)}"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Subheadings (Final Level) -->
                  <Transition name="expand">
                    <div v-if="expandedHeadings.has(heading.hscode)" class="ml-8 mt-2 space-y-1">
                      <button
                        v-for="subheading in heading.subheadings"
                        :key="subheading.hscode"
                        @click="selectSubheading(subheading)"
                        class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 text-left"
                        :class="{'bg-blue-100 border-blue-400': selectedCode === subheading.hscode}"
                      >
                        <span class="text-base flex-shrink-0">🏷️</span>
                        <div class="flex-1 min-w-0">
                          <div class="text-sm">
                            <span class="font-mono bg-blue-100 px-2 py-0.5 rounded font-semibold text-blue-900 flex-shrink-0">{{ subheading.hscode }}</span>
                            <span class="ml-2 text-gray-800 break-words">{{ subheading.description }}</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </Transition>
                  </div>
                </div>
              </Transition>
              </div>
            </div>
          </Transition>
          </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const rawData = ref([])
const sections = ref([])
const sectionGroups = ref([])
const expandedGroups = ref(new Set())
const expandedSections = ref(new Set())
const expandedChapters = ref(new Set())
const expandedHeadings = ref(new Set())
const selectedCode = ref('')
const selectedPath = ref([])

const currentCode = computed(() => String(selectedCode.value || ''))
const currentDescription = computed(() => {
  if (selectedPath.value.length === 0) return ''
  return selectedPath.value[selectedPath.value.length - 1].description
})
const breadcrumb = computed(() => {
  return selectedPath.value.map(item => item.description).join(' → ')
})

const loadData = async () => {
  try {
    const response = await fetch('/hs_codes.json')
    const data = await response.json()
    rawData.value = data
    buildHierarchy()
  } catch (error) {
    console.error('Error loading HS codes:', error)
  } finally {
    loading.value = false
  }
}

const buildHierarchy = () => {
  // First pass: Create maps for efficient lookups
  const chaptersMap = new Map() // key: hscode, value: chapter data
  const headingsMap = new Map() // key: hscode, value: heading data
  const subheadingsMap = new Map() // key: parent, value: array of subheadings

  // Build maps
  rawData.value.forEach(item => {
    if (item.level === 2) {
      chaptersMap.set(item.hscode, {
        hscode: item.hscode,
        description: item.description,
        section: item.section,
        headings: []
      })
    } else if (item.level === 4) {
      headingsMap.set(item.hscode, {
        hscode: item.hscode,
        description: item.description,
        parent: item.parent,
        section: item.section,
        subheadings: []
      })
    } else if (item.level === 6) {
      if (!subheadingsMap.has(item.parent)) {
        subheadingsMap.set(item.parent, [])
      }
      subheadingsMap.get(item.parent).push({
        hscode: item.hscode,
        description: item.description
      })
    }
  })

  // Second pass: Build hierarchy
  const sectionsMap = new Map()

  // Add chapters to sections
  chaptersMap.forEach((chapter, chapterCode) => {
    const sectionId = chapter.section

    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, {
        id: sectionId,
        description: getSectionDescription(sectionId),
        chapters: []
      })
    }

    sectionsMap.get(sectionId).chapters.push(chapter)
  })

  // Add headings to chapters
  headingsMap.forEach((heading, headingCode) => {
    const chapter = chaptersMap.get(heading.parent)
    if (chapter) {
      chapter.headings.push(heading)
    }
  })

  // Add subheadings to headings
  subheadingsMap.forEach((subheadings, parentCode) => {
    const heading = headingsMap.get(parentCode)
    if (heading) {
      heading.subheadings = subheadings
    }
  })

  sections.value = Array.from(sectionsMap.values()).sort((a, b) => {
    return romanToInt(a.id) - romanToInt(b.id)
  })

  buildSectionGroups()
}

const buildSectionGroups = () => {
  const groups = [
    {
      name: 'Animals & Plants',
      emoji: '🌿',
      description: 'Live animals, animal products, and vegetable products',
      sectionRange: 'Sections I-II',
      sectionIds: ['I', 'II']
    },
    {
      name: 'Food & Tobacco',
      emoji: '🍽️',
      description: 'Fats, oils, prepared foodstuffs, beverages, and tobacco',
      sectionRange: 'Sections III-IV',
      sectionIds: ['III', 'IV']
    },
    {
      name: 'Mineral Products',
      emoji: '⛰️',
      description: 'Salt, sulfur, earth, stone, ores, and mineral fuels',
      sectionRange: 'Section V',
      sectionIds: ['V']
    },
    {
      name: 'Chemicals & Pharmaceuticals',
      emoji: '⚗️',
      description: 'Chemical products, pharmaceuticals, and fertilizers',
      sectionRange: 'Section VI',
      sectionIds: ['VI']
    },
    {
      name: 'Plastics & Rubber',
      emoji: '♻️',
      description: 'Plastic materials and rubber products',
      sectionRange: 'Section VII',
      sectionIds: ['VII']
    },
    {
      name: 'Leather, Furs & Wood',
      emoji: '🪵',
      description: 'Raw hides, leather goods, wood, and cork products',
      sectionRange: 'Sections VIII-IX',
      sectionIds: ['VIII', 'IX']
    },
    {
      name: 'Paper & Pulp',
      emoji: '📄',
      description: 'Wood pulp, paper, and paperboard articles',
      sectionRange: 'Section X',
      sectionIds: ['X']
    },
    {
      name: 'Textiles & Apparel',
      emoji: '👔',
      description: 'Textiles, clothing, footwear, and fashion accessories',
      sectionRange: 'Sections XI-XII',
      sectionIds: ['XI', 'XII']
    },
    {
      name: 'Stone & Ceramics',
      emoji: '🏺',
      description: 'Stone, plaster, cement, ceramics, and glass',
      sectionRange: 'Section XIII',
      sectionIds: ['XIII']
    },
    {
      name: 'Precious Materials & Metals',
      emoji: '💎',
      description: 'Gemstones, precious metals, and base metals',
      sectionRange: 'Sections XIV-XV',
      sectionIds: ['XIV', 'XV']
    },
    {
      name: 'Machinery & Electronics',
      emoji: '⚙️',
      description: 'Mechanical appliances and electrical equipment',
      sectionRange: 'Section XVI',
      sectionIds: ['XVI']
    },
    {
      name: 'Transportation Equipment',
      emoji: '🚗',
      description: 'Vehicles, aircraft, vessels, and transport equipment',
      sectionRange: 'Section XVII',
      sectionIds: ['XVII']
    },
    {
      name: 'Precision Instruments',
      emoji: '🔬',
      description: 'Optical, medical, and measuring instruments',
      sectionRange: 'Section XVIII',
      sectionIds: ['XVIII']
    },
    {
      name: 'Arms & Ammunition',
      emoji: '🎯',
      description: 'Weapons, ammunition, and related accessories',
      sectionRange: 'Section XIX',
      sectionIds: ['XIX']
    },
    {
      name: 'Miscellaneous Manufactured',
      emoji: '🎨',
      description: 'Furniture, toys, sports equipment, and other goods',
      sectionRange: 'Section XX',
      sectionIds: ['XX']
    },
    {
      name: 'Art & Antiques',
      emoji: '🖼️',
      description: 'Works of art, collectors\' pieces, and antiques',
      sectionRange: 'Section XXI',
      sectionIds: ['XXI']
    }
  ]

  sectionGroups.value = groups.map(group => ({
    ...group,
    sections: sections.value.filter(s => group.sectionIds.includes(s.id))
  }))
}

const getSectionDescription = (sectionId) => {
  const descriptions = {
    'I': 'Live Animals; Animal Products',
    'II': 'Vegetable Products',
    'III': 'Animal or Vegetable Fats and Oils',
    'IV': 'Prepared Foodstuffs; Beverages, Spirits and Vinegar; Tobacco',
    'V': 'Mineral Products',
    'VI': 'Products of the Chemical or Allied Industries',
    'VII': 'Plastics and Articles Thereof; Rubber and Articles Thereof',
    'VIII': 'Raw Hides and Skins, Leather, Furskins and Articles',
    'IX': 'Wood and Articles of Wood; Cork and Articles of Cork',
    'X': 'Pulp of Wood; Paper and Paperboard',
    'XI': 'Textiles and Textile Articles',
    'XII': 'Footwear, Headgear, Umbrellas, Walking Sticks',
    'XIII': 'Articles of Stone, Plaster, Cement, Asbestos, Mica',
    'XIV': 'Natural or Cultured Pearls, Precious Stones and Metals',
    'XV': 'Base Metals and Articles of Base Metal',
    'XVI': 'Machinery and Mechanical Appliances; Electrical Equipment',
    'XVII': 'Vehicles, Aircraft, Vessels and Associated Transport Equipment',
    'XVIII': 'Optical, Photographic, Cinematographic, Measuring, Checking, Precision, Medical or Surgical Instruments',
    'XIX': 'Arms and Ammunition; Parts and Accessories Thereof',
    'XX': 'Miscellaneous Manufactured Articles',
    'XXI': 'Works of Art, Collectors Pieces and Antiques'
  }
  return descriptions[sectionId] || `Section ${sectionId}`
}

const romanToInt = (roman) => {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100 }
  let result = 0
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]]
    const next = map[roman[i + 1]]
    if (next && current < next) {
      result -= current
    } else {
      result += current
    }
  }
  return result
}

// Helper functions to parse path descriptions
const getSectionName = (desc) => {
  // Format: "Section II: Vegetable Products"
  return desc.split(': ')[1] || desc
}

const getChapterCode = (desc) => {
  // Format: "Chapter 08: Fruit and nuts, edible; peel of citrus fruit or melons"
  const match = desc.match(/Chapter (\d+):/)
  return match ? match[1] : ''
}

const getChapterName = (desc) => {
  // Format: "Chapter 08: Fruit and nuts, edible; peel of citrus fruit or melons"
  return desc.split(': ')[1] || desc
}

const getHeadingCode = (desc) => {
  // Format: "Heading 0808: Apples, pears and quinces; fresh"
  const match = desc.match(/Heading (\d+):/)
  return match ? match[1] : ''
}

const getHeadingName = (desc) => {
  // Format: "Heading 0808: Apples, pears and quinces; fresh"
  return desc.split(': ')[1] || desc
}

const toggleGroup = (groupName) => {
  if (expandedGroups.value.has(groupName)) {
    expandedGroups.value.delete(groupName)
  } else {
    expandedGroups.value.add(groupName)
  }
}

const toggleSection = (sectionId) => {
  if (expandedSections.value.has(sectionId)) {
    expandedSections.value.delete(sectionId)
  } else {
    expandedSections.value.add(sectionId)
  }
}

const toggleChapter = (hscode) => {
  if (expandedChapters.value.has(hscode)) {
    expandedChapters.value.delete(hscode)
  } else {
    expandedChapters.value.add(hscode)
  }
}

const toggleHeading = (hscode) => {
  if (expandedHeadings.value.has(hscode)) {
    expandedHeadings.value.delete(hscode)
  } else {
    expandedHeadings.value.add(hscode)
  }
}

const selectSubheading = (subheading) => {
  selectedCode.value = String(subheading.hscode)

  // Build the path
  const path = []
  const sectionId = sections.value.find(s =>
    s.chapters.some(c =>
      c.headings.some(h =>
        h.subheadings.some(sub => sub.hscode === subheading.hscode)
      )
    )
  )?.id

  if (sectionId) {
    const section = sections.value.find(s => s.id === sectionId)
    path.push({ description: `Section ${sectionId}: ${section.description}` })

    const chapter = section.chapters.find(c =>
      c.headings.some(h =>
        h.subheadings.some(sub => sub.hscode === subheading.hscode)
      )
    )
    if (chapter) {
      path.push({ description: `Chapter ${chapter.hscode}: ${chapter.description}` })

      const heading = chapter.headings.find(h =>
        h.subheadings.some(sub => sub.hscode === subheading.hscode)
      )
      if (heading) {
        path.push({ description: `Heading ${heading.hscode}: ${heading.description}` })
        path.push({ description: subheading.description })
      }
    }
  }

  selectedPath.value = path
}

const clearSelection = () => {
  selectedCode.value = ''
  selectedPath.value = []
}

const expandAll = () => {
  // Expand all groups
  sectionGroups.value.forEach(group => {
    expandedGroups.value.add(group.name)

    // Expand all sections in each group
    group.sections.forEach(section => {
      expandedSections.value.add(section.id)

      // Expand all chapters in each section
      section.chapters.forEach(chapter => {
        expandedChapters.value.add(chapter.hscode)

        // Expand all headings in each chapter
        chapter.headings.forEach(heading => {
          expandedHeadings.value.add(heading.hscode)
        })
      })
    })
  })
}

const collapseAll = () => {
  expandedGroups.value.clear()
  expandedSections.value.clear()
  expandedChapters.value.clear()
  expandedHeadings.value.clear()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
@keyframes sailBoat {
  0% {
    transform: translateX(0px) scaleX(1);
  }
  45% {
    transform: translateX(60px) scaleX(1);
  }
  50% {
    transform: translateX(60px) scaleX(-1);
  }
  95% {
    transform: translateX(0px) scaleX(-1);
  }
  100% {
    transform: translateX(0px) scaleX(1);
  }
}

.boat-emoji {
  display: inline-block;
  height: 24px;
  width: auto;
  vertical-align: middle;
  animation: sailBoat 6s ease-in-out infinite;
}

/* Expand/Collapse Transitions */
.expand-enter-active {
  animation: expand-in 0.2s ease-out;
}

.expand-leave-active {
  animation: expand-out 0.15s ease-in;
}

@keyframes expand-in {
  0% {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
  100% {
    opacity: 1;
    max-height: 2000px;
  }
}

@keyframes expand-out {
  0% {
    opacity: 1;
    max-height: 2000px;
  }
  100% {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
}
</style>
