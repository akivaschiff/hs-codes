<template>
  <div class="space-y-6">
    <!-- Game Header -->
    <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">Trade Inspector Game</h1>
          <p class="text-green-100">Match products to their correct HS codes</p>
        </div>
        <div class="text-right">
          <div class="text-sm text-green-100">Question</div>
          <div class="text-3xl font-bold">{{ currentQuestionIndex + 1 }} / {{ gameQuestions.length }}</div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-green-800 bg-opacity-30 rounded-full h-3">
        <div
          class="bg-white rounded-full h-3 transition-all duration-500 ease-out"
          :style="{ width: `${((currentQuestionIndex + 1) / gameQuestions.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
      <div class="text-gray-500">Loading game...</div>
    </div>

    <!-- Game Complete Modal -->
    <div v-else-if="gameComplete" class="fixed inset-0 z-50 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.7);">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-4 animate-bounce-in">
        <div class="text-center">
          <!-- Dynamic Emoji & Title based on score -->
          <div class="text-8xl mb-4">{{ getCompletionEmoji() }}</div>
          <h2 class="text-4xl font-bold mb-3" :class="getCompletionColor()">{{ getCompletionTitle() }}</h2>
          <p class="text-xl text-gray-600 mb-6">{{ getCompletionMessage() }}</p>

          <!-- Score Display -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
            <div class="text-6xl font-bold mb-2" :class="getScoreColor()">{{ totalScore }}</div>
            <div class="text-gray-600 font-medium">out of 500 points</div>
            <div class="text-sm text-gray-500 mt-2">{{ getScorePercentage() }}%</div>
          </div>

          <!-- Breakdown -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
              <div class="text-3xl mb-2">🎯</div>
              <div class="text-2xl font-bold text-green-600">{{ scoreBreakdown.perfect }}</div>
              <div class="text-xs text-gray-600">Perfect Rounds</div>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div class="text-3xl mb-2">✅</div>
              <div class="text-2xl font-bold text-yellow-600">{{ scoreBreakdown.good }}</div>
              <div class="text-xs text-gray-600">Good Attempts</div>
            </div>
            <div class="bg-red-50 rounded-lg p-4 border border-red-200">
              <div class="text-3xl mb-2">❌</div>
              <div class="text-2xl font-bold text-red-600">{{ scoreBreakdown.poor }}</div>
              <div class="text-xs text-gray-600">Tough Ones</div>
            </div>
          </div>

          <!-- Fun Stats -->
          <div class="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <div class="text-sm text-blue-900">
              <span class="font-semibold">Trade Inspector Status:</span> {{ getTradeInspectorRank() }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 justify-center">
            <button
              @click="restartGame"
              class="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              🔄 Play Again
            </button>
            <button
              @click="router.push('/explorer')"
              class="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Exit to Explorer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Game -->
    <div v-else class="grid lg:grid-cols-2 gap-6 items-start">
      <!-- Left: Product Image & Info -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-900">Classify This Product</h3>
            <div class="flex items-center gap-2">
              <span
                v-for="i in 4"
                :key="i"
                class="w-3 h-3 rounded-full"
                :class="i <= currentMistakes ? 'bg-red-500' : 'bg-gray-200'"
              ></span>
            </div>
          </div>
          <p class="text-sm text-gray-600">Find the correct 6-digit HS code by navigating the hierarchy</p>
        </div>

        <!-- Product Image -->
        <div class="bg-gray-100 rounded-lg overflow-hidden mb-4" style="aspect-ratio: 1/1;" :class="{ 'shake': isShaking }">
          <img
            :src="`/game_images/${currentQuestion.id}`"
            :alt="currentQuestion.tag"
            class="w-full h-full object-contain"
          />
        </div>

        <!-- Product Name -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
          <div class="text-sm text-blue-600 font-semibold mb-1">Product</div>
          <div class="text-2xl font-bold text-gray-900">{{ currentQuestion.tag }}</div>
        </div>

        <!-- Mistakes Counter -->
        <div v-if="currentMistakes > 0 && currentMistakes < 4" class="mt-4 border-l-4 p-4 rounded bg-red-50 border-red-400">
          <div class="flex items-start">
            <span class="text-xl mr-2 text-red-600">⚠️</span>
            <div>
              <div class="text-sm font-semibold text-red-900">
                {{ currentMistakes }} {{ currentMistakes === 1 ? 'mistake' : 'mistakes' }} so far
              </div>
              <div class="text-xs mt-1 text-red-700">
                {{ 4 - currentMistakes }} mistakes remaining
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message (for specific products) -->
        <div v-if="currentQuestion.error_message && currentMistakes > 0" class="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div class="text-sm text-blue-900">
            <span class="font-semibold">💡 Hint:</span> {{ currentQuestion.error_message }}
          </div>
        </div>
      </div>

      <!-- Right: HS Code Navigator -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
        <div class="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h3 class="text-lg font-semibold text-gray-900">Navigate to the Correct Code</h3>
          <p class="text-sm text-gray-600 mt-1">Expand sections to find the right classification</p>
        </div>

        <div class="p-4 space-y-2 overflow-y-auto flex-1">
          <!-- Grouped Sections -->
          <div v-for="group in sectionGroups" :key="group.name" class="space-y-2">
            <!-- Group Header -->
            <button
              @click="toggleGroup(group.name)"
              class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div class="flex items-center space-x-2 flex-1 min-w-0">
                <span class="text-base flex-shrink-0">{{ group.emoji }}</span>
                <span class="font-medium text-gray-900 text-sm break-words">{{ group.name }}</span>
              </div>
              <svg
                class="w-4 h-4 text-gray-400 transition-transform flex-shrink-0"
                :class="expandedGroups.has(group.name) ? 'rotate-180' : ''"
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
                <div v-for="section in group.sections" :key="section.id" class="space-y-2">
                  <!-- Section Header -->
                  <button
                    @click="toggleSection(section.id)"
                    class="w-full flex items-center justify-between p-3 rounded-lg transition-colors border border-gray-200"
                    :class="wrongSelections.has(`section-${section.id}`) ? 'border-red-300 bg-red-50 cursor-not-allowed opacity-60' : 'hover:bg-gray-50 cursor-pointer'"
                  >
                    <div class="flex items-center space-x-3 flex-1 min-w-0">
                      <span class="text-lg flex-shrink-0">📂</span>
                      <div class="text-left flex-1 min-w-0">
                        <div class="text-sm font-medium text-gray-900 break-words">{{ section.description }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                      <span v-if="wrongSelections.has(`section-${section.id}`)" class="text-red-500 text-sm">✗</span>
                      <svg
                        class="w-5 h-5 text-gray-400 transition-transform"
                        :class="expandedSections.has(section.id) ? 'rotate-180' : ''"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <!-- Chapters within section -->
                  <Transition name="expand">
                    <div v-if="expandedSections.has(section.id)" class="ml-6 space-y-2">
                      <div v-for="chapter in section.chapters" :key="chapter.hscode" class="space-y-2">
                        <!-- Chapter Header -->
                        <button
                          @click="toggleChapter(chapter.hscode)"
                          class="w-full flex items-center justify-between p-3 rounded-lg transition-colors border border-gray-200"
                          :class="wrongSelections.has(`chapter-${chapter.hscode}`) ? 'border-red-300 bg-red-50 cursor-not-allowed opacity-60' : 'hover:bg-gray-50 cursor-pointer'"
                        >
                          <div class="flex items-center space-x-3 flex-1 min-w-0">
                            <span class="text-lg flex-shrink-0">📖</span>
                            <div class="text-left flex-1 min-w-0">
                              <div class="font-medium text-gray-900">
                                <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm flex-shrink-0">{{ chapter.hscode }}</span>
                                <span class="ml-2 break-words text-sm">{{ chapter.description }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="flex items-center gap-2 flex-shrink-0">
                            <span v-if="wrongSelections.has(`chapter-${chapter.hscode}`) " class="text-red-500 text-sm">✗</span>
                            <svg
                              class="w-5 h-5 text-gray-400 transition-transform"
                              :class="expandedChapters.has(chapter.hscode) ? 'rotate-180' : ''"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        <!-- Headings within chapter -->
                        <Transition name="expand">
                          <div v-if="expandedChapters.has(chapter.hscode)" class="ml-6 space-y-2">
                            <div v-for="heading in chapter.headings" :key="heading.hscode" class="space-y-2">
                              <!-- Heading Header -->
                              <button
                                @click="toggleHeading(heading.hscode)"
                                class="w-full flex items-center justify-between p-3 rounded-lg transition-colors border border-gray-200"
                                :class="wrongSelections.has(`heading-${heading.hscode}`) ? 'border-red-300 bg-red-50 cursor-not-allowed opacity-60' : 'hover:bg-gray-50 cursor-pointer'"
                              >
                                <div class="flex items-center space-x-3 flex-1 min-w-0">
                                  <span class="text-lg flex-shrink-0">📄</span>
                                  <div class="text-left flex-1 min-w-0">
                                    <div class="font-medium text-gray-900">
                                      <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm flex-shrink-0">{{ heading.hscode }}</span>
                                      <span class="ml-2 break-words text-sm">{{ heading.description }}</span>
                                    </div>
                                  </div>
                                </div>
                                <div class="flex items-center gap-2 flex-shrink-0">
                                  <span v-if="wrongSelections.has(`heading-${heading.hscode}`)" class="text-red-500 text-sm">✗</span>
                                  <svg
                                    class="w-5 h-5 text-gray-400 transition-transform"
                                    :class="expandedHeadings.has(heading.hscode) ? 'rotate-180' : ''"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </button>

                              <!-- Subheadings within heading -->
                              <Transition name="expand">
                                <div v-if="expandedHeadings.has(heading.hscode)" class="ml-6 space-y-1">
                                  <button
                                    v-for="subheading in heading.subheadings"
                                    :key="subheading.hscode"
                                    @click="selectCode(subheading.hscode)"
                                    class="w-full flex items-center justify-between p-3 rounded-lg transition-colors border border-gray-200"
                                    :class="wrongSelections.has(`subheading-${subheading.hscode}`) ? 'border-red-300 bg-red-50 cursor-not-allowed opacity-60' : 'hover:bg-green-50 hover:border-green-300 cursor-pointer'"
                                  >
                                    <div class="flex items-center space-x-3 flex-1 min-w-0">
                                      <span class="text-base flex-shrink-0">📌</span>
                                      <div class="text-left flex-1 min-w-0">
                                        <div class="text-sm">
                                          <span class="font-mono bg-green-100 px-2 py-0.5 rounded text-sm font-semibold flex-shrink-0">{{ subheading.hscode }}</span>
                                          <span class="ml-2 text-gray-700 break-words">{{ subheading.description }}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <span v-if="wrongSelections.has(`subheading-${subheading.hscode}`)" class="text-red-500 text-sm flex-shrink-0">✗</span>
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

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background-color: rgba(0, 0, 0, 0.5);"
      @click="nextQuestion"
    >
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4" @click.stop>
        <div class="text-center">
          <div class="text-6xl mb-4">{{ getSuccessEmoji() }}</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ getSuccessTitle() }}</h3>
          <div class="text-4xl font-bold text-green-600 mb-4">+{{ currentQuestionScore }} points</div>
          <p class="text-gray-600 mb-6">
            {{ currentMistakes === 0 ? 'Perfect! No mistakes!' : `Completed with ${currentMistakes} mistake${currentMistakes === 1 ? '' : 's'}` }}
          </p>
          <button
            @click="nextQuestion"
            class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            {{ currentQuestionIndex < gameQuestions.length - 1 ? 'Next Product →' : 'See Results' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Failure Modal -->
    <div
      v-if="showFailureModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
      style="background-color: rgba(0, 0, 0, 0.5);"
      @click="nextQuestion"
    >
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4" @click.stop>
        <div class="text-center">
          <div class="text-6xl mb-4">🤔</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Keep Learning!</h3>
          <div class="text-4xl font-bold text-orange-600 mb-4">+0 points</div>
          <p class="text-gray-600 mb-4">
            Don't worry! HS codes can be tricky. You'll get the next one!
          </p>

          <!-- Show the correct answer -->
          <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6 text-left">
            <div class="text-sm text-blue-600 font-semibold mb-2">The correct answer was:</div>
            <div class="font-mono text-sm text-gray-900 break-words">
              {{ getCorrectCodeDescription() }}
            </div>
          </div>

          <button
            @click="nextQuestion"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {{ currentQuestionIndex < gameQuestions.length - 1 ? 'Next Product →' : 'See Results' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(true)
const rawData = ref([])
const gameExamples = ref([])
const selectedQuestions = ref([])
const sectionGroups = ref([])
const expandedGroups = ref(new Set())
const expandedSections = ref(new Set())
const expandedChapters = ref(new Set())
const expandedHeadings = ref(new Set())
const wrongSelections = ref(new Set())

// Game state
const currentQuestionIndex = ref(0)
const currentMistakes = ref(0)
const questionScores = ref([])
const showSuccessModal = ref(false)
const showFailureModal = ref(false)
const gameComplete = ref(false)
const isShaking = ref(false)
const autoAdvanceTimeout = ref(null)

const gameQuestions = computed(() => selectedQuestions.value)
const currentQuestion = computed(() => gameQuestions.value[currentQuestionIndex.value])
const currentQuestionScore = computed(() => {
  const mistakes = currentMistakes.value
  if (mistakes === 0) return 100
  if (mistakes === 1) return 80
  if (mistakes === 2) return 60
  if (mistakes === 3) return 40
  return 0
})

const totalScore = computed(() => {
  return questionScores.value.reduce((sum, score) => sum + score, 0)
})

const scoreBreakdown = computed(() => {
  return {
    perfect: questionScores.value.filter(s => s === 100).length,
    good: questionScores.value.filter(s => s > 0 && s < 100).length,
    poor: questionScores.value.filter(s => s === 0).length
  }
})

const selectRandomQuestions = (questions, count = 5) => {
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, questions.length))
}

const loadData = async () => {
  try {
    const [hsResponse, gameResponse] = await Promise.all([
      fetch('/hs_codes.json'),
      fetch('/game_examples.json')
    ])

    const hsData = await hsResponse.json()
    const gameData = await gameResponse.json()

    rawData.value = hsData
    gameExamples.value = gameData

    // Select 5 random questions for the game
    selectedQuestions.value = selectRandomQuestions(gameData, 5)

    buildHierarchy()
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const romanToNumber = (roman) => {
  const romanNumerals = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15,
    'XVI': 16, 'XVII': 17, 'XVIII': 18, 'XIX': 19, 'XX': 20,
    'XXI': 21, 'XXII': 22
  }
  return romanNumerals[roman] || roman
}

const buildHierarchy = () => {
  // Same logic as ExplorerView
  const chaptersMap = new Map()
  const headingsMap = new Map()
  const subheadingsMap = new Map()

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

  const sectionsMap = new Map()

  chaptersMap.forEach((chapter, chapterCode) => {
    const sectionId = romanToNumber(chapter.section)  // Convert Roman numeral to number

    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, {
        id: sectionId,
        description: getSectionDescription(sectionId),
        chapters: []
      })
    }

    sectionsMap.get(sectionId).chapters.push(chapter)
  })

  headingsMap.forEach((heading, headingCode) => {
    const chapter = chaptersMap.get(heading.parent)
    if (chapter) {
      chapter.headings.push(heading)
    }
  })

  subheadingsMap.forEach((subheadings, parentCode) => {
    const heading = headingsMap.get(parentCode)
    if (heading) {
      heading.subheadings = subheadings
    }
  })

  const sections = Array.from(sectionsMap.values()).sort((a, b) => a.id - b.id)

  // Group sections - sections are organized by their ID in the HS code system
  const groups = [
    { name: 'Live Animals & Products', emoji: '🐄', sectionIds: [1] },
    { name: 'Vegetable Products', emoji: '🌾', sectionIds: [2] },
    { name: 'Prepared Foods & Beverages', emoji: '🍕', sectionIds: [3, 4] },
    { name: 'Minerals & Chemicals', emoji: '⚗️', sectionIds: [5, 6] },
    { name: 'Plastics & Rubber', emoji: '🧪', sectionIds: [7] },
    { name: 'Hides, Skins & Leather', emoji: '🦌', sectionIds: [8] },
    { name: 'Wood & Cork', emoji: '🌳', sectionIds: [9] },
    { name: 'Pulp, Paper & Printed Matter', emoji: '📄', sectionIds: [10] },
    { name: 'Textiles', emoji: '🧵', sectionIds: [11] },
    { name: 'Footwear & Headgear', emoji: '👞', sectionIds: [12] },
    { name: 'Stone, Cement & Ceramics', emoji: '🏺', sectionIds: [13] },
    { name: 'Precious Metals & Stones', emoji: '💎', sectionIds: [14] },
    { name: 'Base Metals', emoji: '🔩', sectionIds: [15] },
    { name: 'Machinery & Electronics', emoji: '⚙️', sectionIds: [16] },
    { name: 'Transportation', emoji: '🚗', sectionIds: [17] },
    { name: 'Precision Instruments', emoji: '🔬', sectionIds: [18] },
    { name: 'Arms & Ammunition', emoji: '🎯', sectionIds: [19] },
    { name: 'Miscellaneous', emoji: '🎨', sectionIds: [20, 21] }
  ].map(group => ({
    ...group,
    sections: group.sectionIds.map(id => sectionsMap.get(id)).filter(Boolean)
  })).filter(group => group.sections.length > 0)

  sectionGroups.value = groups
}

const getSectionDescription = (sectionId) => {
  const descriptions = {
    1: 'I - Live animals; animal products',
    2: 'II - Vegetable products',
    3: 'III - Animal or vegetable fats and oils and their cleavage products; prepared edible fats; animal or vegetable waxes',
    4: 'IV - Prepared foodstuffs; beverages, spirits and vinegar; tobacco and manufactured tobacco substitutes',
    5: 'V - Mineral products',
    6: 'VI - Products of the chemical or allied industries',
    7: 'VII - Plastics and articles thereof; rubber and articles thereof',
    8: 'VIII - Raw hides and skins, leather, furskins and articles thereof; saddlery and harness; travel goods, handbags and similar containers; articles of animal gut (other than silkworm gut)',
    9: 'IX - Wood and articles of wood; wood charcoal; cork and articles of cork; manufactures of straw, of esparto or of other plaiting materials; basketware and wickerwork',
    10: 'X - Pulp of wood or of other fibrous cellulosic material; recovered (waste and scrap) paper or paperboard; paper and paperboard and articles thereof',
    11: 'XI - Textiles and textile articles',
    12: 'XII - Footwear, headgear, umbrellas, sun umbrellas, walking sticks, seat-sticks, whips, riding-crops and parts thereof; prepared feathers and articles made therewith; artificial flowers; articles of human hair',
    13: 'XIII - Articles of stone, plaster, cement, asbestos, mica or similar materials; ceramic products; glass and glassware',
    14: 'XIV - Natural or cultured pearls, precious or semi-precious stones, precious metals, metals clad with precious metal, and articles thereof; imitation jewellery; coin',
    15: 'XV - Base metals and articles of base metal',
    16: 'XVI - Machinery and mechanical appliances; electrical equipment; parts thereof; sound recorders and reproducers, television image and sound recorders and reproducers, and parts and accessories of such articles',
    17: 'XVII - Vehicles, aircraft, vessels and associated transport equipment',
    18: 'XVIII - Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments and apparatus; clocks and watches; musical instruments; parts and accessories thereof',
    19: 'XIX - Arms and ammunition; parts and accessories thereof',
    20: 'XX - Miscellaneous manufactured articles',
    21: 'XXI - Works of art, collectors\' pieces and antiques'
  }
  return descriptions[sectionId] || `Section ${sectionId}`
}

const getSectionName = (description) => {
  return description.replace(/^[IVXLCDM]+\s*-\s*/, '')
}

const triggerShake = () => {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 500)
}

const toggleGroup = (groupName) => {
  if (expandedGroups.value.has(groupName)) {
    expandedGroups.value.delete(groupName)
  } else {
    expandedGroups.value.add(groupName)
  }
}

const toggleSection = (sectionId) => {
  // Don't allow any interaction after max mistakes
  if (currentMistakes.value >= 4) {
    return
  }

  // Don't allow re-clicking wrong selections
  if (wrongSelections.value.has(`section-${sectionId}`)) {
    return
  }

  const correctCode = currentQuestion.value.hscodes[0]
  const correctChapter = correctCode.slice(0, 2)

  // Find if this section contains the correct chapter
  const group = sectionGroups.value.find(g =>
    g.sections.some(s => s.id === sectionId)
  )
  const section = group?.sections.find(s => s.id === sectionId)

  // Convert hscode to string for comparison (hscodes in JSON can be numbers or strings)
  const hasCorrectChapter = section?.chapters.some(ch => String(ch.hscode) === correctChapter)

  if (!hasCorrectChapter) {
    wrongSelections.value.add(`section-${sectionId}`)
    currentMistakes.value++
    triggerShake()
    return
  }

  if (expandedSections.value.has(sectionId)) {
    expandedSections.value.delete(sectionId)
  } else {
    expandedSections.value.add(sectionId)
  }
}

const toggleChapter = (chapterCode) => {
  // Don't allow any interaction after max mistakes
  if (currentMistakes.value >= 4) {
    return
  }

  // Don't allow re-clicking wrong selections
  if (wrongSelections.value.has(`chapter-${chapterCode}`)) {
    return
  }

  const correctCode = currentQuestion.value.hscodes[0]
  const correctChapter = correctCode.slice(0, 2)

  // Convert to string for comparison
  if (String(chapterCode) !== correctChapter) {
    wrongSelections.value.add(`chapter-${chapterCode}`)
    currentMistakes.value++
    triggerShake()
    return
  }

  if (expandedChapters.value.has(chapterCode)) {
    expandedChapters.value.delete(chapterCode)
  } else {
    expandedChapters.value.add(chapterCode)
  }
}

const toggleHeading = (headingCode) => {
  // Don't allow any interaction after max mistakes
  if (currentMistakes.value >= 4) {
    return
  }

  // Don't allow re-clicking wrong selections
  if (wrongSelections.value.has(`heading-${headingCode}`)) {
    return
  }

  const correctCode = currentQuestion.value.hscodes[0]
  const correctHeading = correctCode.slice(0, 4)

  // Convert to string for comparison
  if (String(headingCode) !== correctHeading) {
    wrongSelections.value.add(`heading-${headingCode}`)
    currentMistakes.value++
    triggerShake()
    return
  }

  if (expandedHeadings.value.has(headingCode)) {
    expandedHeadings.value.delete(headingCode)
  } else {
    expandedHeadings.value.add(headingCode)
  }
}

const selectCode = (code) => {
  // Don't allow any interaction after max mistakes
  if (currentMistakes.value >= 4) {
    return
  }

  // Don't allow re-clicking wrong selections
  if (wrongSelections.value.has(`subheading-${code}`)) {
    return
  }

  const correctCode = currentQuestion.value.hscodes[0]

  // Convert both to strings for consistent comparison
  const codeStr = String(code)
  const correctCodeStr = String(correctCode)

  // Check if it's an exact match or if the correct code is a heading-level (4 digits)
  // and the selected code starts with it
  const isCorrect = codeStr === correctCodeStr ||
    (correctCodeStr.length === 4 && codeStr.startsWith(correctCodeStr))

  if (isCorrect) {
    // Correct answer!
    questionScores.value.push(currentQuestionScore.value)
    showSuccessModal.value = true
  } else {
    wrongSelections.value.add(`subheading-${code}`)
    currentMistakes.value++
    triggerShake()
  }
}

const nextQuestion = () => {
  showSuccessModal.value = false
  showFailureModal.value = false

  if (currentQuestionIndex.value < gameQuestions.value.length - 1) {
    // Move to next question
    currentQuestionIndex.value++
    resetQuestionState()
  } else {
    // Game complete
    gameComplete.value = true
  }
}

const getCorrectCodeDescription = () => {
  const correctCode = currentQuestion.value.hscodes[0]

  // Find the correct code in the hierarchy
  for (const group of sectionGroups.value) {
    for (const section of group.sections) {
      for (const chapter of section.chapters) {
        for (const heading of chapter.headings) {
          // Check if it's a heading-level match (4 digits)
          if (correctCode.length === 4 && String(heading.hscode) === correctCode) {
            return `${heading.hscode} - ${heading.description}`
          }
          // Check subheadings for exact match
          for (const subheading of heading.subheadings) {
            if (String(subheading.hscode) === correctCode) {
              return `${subheading.hscode} - ${subheading.description}`
            }
          }
        }
      }
    }
  }
  return correctCode
}

const resetQuestionState = () => {
  // Clear any pending auto-advance timeout
  if (autoAdvanceTimeout.value) {
    clearTimeout(autoAdvanceTimeout.value)
    autoAdvanceTimeout.value = null
  }

  currentMistakes.value = 0
  wrongSelections.value = new Set()
  expandedGroups.value = new Set()
  expandedSections.value = new Set()
  expandedChapters.value = new Set()
  expandedHeadings.value = new Set()
}

const restartGame = () => {
  currentQuestionIndex.value = 0
  questionScores.value = []
  gameComplete.value = false

  // Select new random questions
  selectedQuestions.value = selectRandomQuestions(gameExamples.value, 5)

  resetQuestionState()
}

const getSuccessEmoji = () => {
  const mistakes = currentMistakes.value
  if (mistakes === 0) return '🎯'
  if (mistakes <= 2) return '✅'
  return '👍'
}

const getSuccessTitle = () => {
  const mistakes = currentMistakes.value
  if (mistakes === 0) return 'Perfect!'
  if (mistakes === 1) return 'Great Job!'
  if (mistakes <= 3) return 'Good Work!'
  return 'Correct!'
}

// Completion modal functions
const getScorePercentage = () => {
  return Math.round((totalScore.value / 500) * 100)
}

const getScoreColor = () => {
  const score = totalScore.value
  if (score >= 450) return 'text-green-600'
  if (score >= 350) return 'text-blue-600'
  if (score >= 250) return 'text-yellow-600'
  if (score >= 150) return 'text-orange-600'
  return 'text-red-600'
}

const getCompletionEmoji = () => {
  const score = totalScore.value
  if (score === 500) return '🏆'
  if (score >= 450) return '🎉'
  if (score >= 350) return '🎊'
  if (score >= 250) return '👍'
  if (score >= 150) return '😅'
  return '🤔'
}

const getCompletionTitle = () => {
  const score = totalScore.value
  if (score === 500) return 'Absolute Legend!'
  if (score >= 450) return 'HS Code Master!'
  if (score >= 350) return 'Trade Expert!'
  if (score >= 250) return 'Pretty Good!'
  if (score >= 150) return 'Room for Improvement'
  return 'Keep Practicing!'
}

const getCompletionColor = () => {
  const score = totalScore.value
  if (score >= 400) return 'text-green-600'
  if (score >= 300) return 'text-blue-600'
  if (score >= 200) return 'text-yellow-600'
  return 'text-gray-700'
}

const getCompletionMessage = () => {
  const score = totalScore.value
  const perfect = scoreBreakdown.value.perfect

  if (score === 500) return "Perfect score! You're ready for customs duty!"
  if (score >= 450) return `${perfect} perfect rounds - you really know your trade codes!`
  if (score >= 350) return "Solid performance! The HS code system is making sense."
  if (score >= 250) return "Not bad! A few more rounds and you'll be a pro."
  if (score >= 150) return "You're getting the hang of it. Practice makes perfect!"
  return "HS codes are tricky! Try again to improve your score."
}

const getTradeInspectorRank = () => {
  const score = totalScore.value
  if (score === 500) return '⭐⭐⭐⭐⭐ Chief Customs Officer'
  if (score >= 450) return '⭐⭐⭐⭐ Senior Trade Inspector'
  if (score >= 350) return '⭐⭐⭐ Trade Inspector'
  if (score >= 250) return '⭐⭐ Junior Inspector'
  if (score >= 150) return '⭐ Customs Trainee'
  return '📋 Still Learning the Ropes'
}

// Watch for max mistakes and show failure modal
watch(currentMistakes, (newMistakes) => {
  if (newMistakes >= 4) {
    // Clear any existing timeout
    if (autoAdvanceTimeout.value) {
      clearTimeout(autoAdvanceTimeout.value)
    }

    // Record the score (0 points for max mistakes)
    questionScores.value.push(0)

    // Show failure modal
    showFailureModal.value = true
  }
})

onMounted(() => {
  loadData()
})
</script>

<style scoped>
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

/* Shake Animation for Errors */
.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(4px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-6px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(6px, 0, 0);
  }
}

/* Bounce-in Animation for Completion Modal */
.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-100px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>
