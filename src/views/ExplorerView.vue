<template>
  <div class="space-y-6">
    <!-- Code Builder Display -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-medium text-gray-600">Building HS Code</h3>
        <button
          v-if="selectedPath.length > 0"
          @click="clearSelection"
          class="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear
        </button>
      </div>
      <div class="flex items-center space-x-2 min-h-[2.5rem]">
        <span class="text-3xl font-bold text-gray-800 font-mono">
          {{ currentCode || '—' }}
        </span>
        <div v-if="selectedPath.length > 0" class="flex-1 ml-4">
          <div class="text-sm text-gray-600">
            {{ currentDescription }}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            {{ breadcrumb }}
          </div>
        </div>
      </div>
    </div>

    <!-- Explorer Tree -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
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
            <div class="flex items-center space-x-3 flex-1">
              <span class="text-2xl">{{ group.emoji }}</span>
              <div class="text-left flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-semibold text-gray-900">{{ group.name }}</div>
                    <div class="text-sm text-gray-600">{{ group.description }}</div>
                  </div>
                  <div class="text-xs text-gray-500 ml-4">{{ group.sectionRange }}</div>
                </div>
              </div>
            </div>
            <svg
              class="w-5 h-5 text-gray-400 transition-transform ml-2"
              :class="{'rotate-180': expandedGroups.has(group.name)}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Sections within group -->
          <div v-if="expandedGroups.has(group.name)" class="ml-6 mt-2 space-y-2">
            <div v-for="section in group.sections" :key="section.id" class="mb-2">
              <button
                @click="toggleSection(section.id)"
                class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                :class="{'bg-blue-50 border-blue-300': expandedSections.has(section.id)}"
              >
                <div class="flex items-center space-x-3 flex-1">
                  <span class="text-lg">{{ expandedSections.has(section.id) ? '📂' : '📁' }}</span>
                  <div class="text-left flex-1">
                    <div class="font-medium text-gray-900 flex items-center justify-between">
                      <span class="text-sm text-gray-600">{{ section.description }}</span>
                      <span class="text-xs text-gray-500 ml-2">Section {{ section.id }}</span>
                    </div>
                  </div>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform ml-2"
                  :class="{'rotate-180': expandedSections.has(section.id)}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

          <!-- Chapters -->
          <div v-if="expandedSections.has(section.id)" class="ml-8 mt-2 space-y-2">
            <div v-for="chapter in section.chapters" :key="chapter.hscode" class="mb-2">
              <button
                @click="toggleChapter(chapter.hscode)"
                class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                :class="{'bg-blue-50 border-blue-300': expandedChapters.has(chapter.hscode)}"
              >
                <div class="flex items-center space-x-3">
                  <span class="text-lg">{{ expandedChapters.has(chapter.hscode) ? '📖' : '📕' }}</span>
                  <div class="text-left">
                    <div class="font-medium text-gray-900">
                      <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">{{ chapter.hscode }}</span>
                      <span class="ml-2">{{ chapter.description }}</span>
                    </div>
                  </div>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{'rotate-180': expandedChapters.has(chapter.hscode)}"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Headings -->
              <div v-if="expandedChapters.has(chapter.hscode)" class="ml-8 mt-2 space-y-2">
                <div v-for="heading in chapter.headings" :key="heading.hscode" class="mb-2">
                  <button
                    @click="toggleHeading(heading.hscode)"
                    class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    :class="{'bg-blue-50 border-blue-300': expandedHeadings.has(heading.hscode)}"
                  >
                    <div class="flex items-center space-x-3">
                      <span class="text-base">{{ expandedHeadings.has(heading.hscode) ? '📄' : '📃' }}</span>
                      <div class="text-left">
                        <div class="text-sm font-medium text-gray-900">
                          <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">{{ heading.hscode }}</span>
                          <span class="ml-2">{{ heading.description }}</span>
                        </div>
                      </div>
                    </div>
                    <svg
                      class="w-5 h-5 text-gray-400 transition-transform"
                      :class="{'rotate-180': expandedHeadings.has(heading.hscode)}"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Subheadings (Final Level) -->
                  <div v-if="expandedHeadings.has(heading.hscode)" class="ml-8 mt-2 space-y-1">
                    <button
                      v-for="subheading in heading.subheadings"
                      :key="subheading.hscode"
                      @click="selectSubheading(subheading)"
                      class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 text-left"
                      :class="{'bg-blue-100 border-blue-400': selectedCode === subheading.hscode}"
                    >
                      <span class="text-base">🏷️</span>
                      <div class="flex-1">
                        <div class="text-sm">
                          <span class="font-mono bg-blue-100 px-2 py-0.5 rounded font-semibold text-blue-900">{{ subheading.hscode }}</span>
                          <span class="ml-2 text-gray-800">{{ subheading.description }}</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
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

const currentCode = computed(() => selectedCode.value || '')
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
  const sectionsMap = new Map()

  rawData.value.forEach(item => {
    const sectionId = item.section

    // Initialize section if needed
    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, {
        id: sectionId,
        description: getSectionDescription(sectionId),
        chapters: []
      })
    }

    const section = sectionsMap.get(sectionId)

    // Level 2: Chapters (2 digits)
    if (item.level === 2) {
      section.chapters.push({
        hscode: item.hscode,
        description: item.description,
        headings: []
      })
    }
    // Level 4: Headings (4 digits)
    else if (item.level === 4) {
      const chapter = section.chapters.find(c => c.hscode === item.parent)
      if (chapter) {
        chapter.headings.push({
          hscode: item.hscode,
          description: item.description,
          subheadings: []
        })
      }
    }
    // Level 6: Subheadings (6 digits)
    else if (item.level === 6) {
      const parentStr = String(item.parent)
      const chapter = section.chapters.find(c => parentStr.startsWith(c.hscode))
      if (chapter) {
        const heading = chapter.headings.find(h => h.hscode === parentStr)
        if (heading) {
          heading.subheadings.push({
            hscode: item.hscode,
            description: item.description
          })
        }
      }
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
  selectedCode.value = subheading.hscode

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
  sectionGroups.value.forEach(group => {
    expandedGroups.value.add(group.name)
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
