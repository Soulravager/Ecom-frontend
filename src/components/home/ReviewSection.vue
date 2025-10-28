<template>
  <section
    class="w-full bg-gray-100 py-12 px-4 md:px-16 lg:px-24 overflow-hidden relative"
  >
    <div class="mb-8 text-center md:text-left">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
        Customer Reviews
      </h2>
      <p class="text-gray-500 mt-2 text-sm md:text-base">
        Hear what our satisfied PC enthusiasts say about our products
      </p>
    </div>

    <div class="relative flex items-center justify-center">
      <button
        @click="prevSlide"
        class="absolute left-[-10px] md:left-[-25px] z-10 bg-indigo-600 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md hover:bg-indigo-700 transition"
      >
        <img src="../../assets/common/leftbtn.png" alt="Left" class="w-5 h-5" />
      </button>

      <div class="overflow-hidden w-full">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }"
        >
          <div
            v-for="(review, index) in reviews"
            :key="index"
            :class="`flex-shrink-0 p-4`"
            :style="{ width: `${100 / visibleCards}%` }"
          >
            <div
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden p-8 flex flex-col justify-between h-full"
            >
              <p
                class="text-gray-600 text-base md:text-lg leading-relaxed mb-4 italic"
              >
                “{{ review.text }}”
              </p>
              <h3 class="text-gray-800 font-semibold text-sm md:text-base">
                — {{ review.author }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="nextSlide"
        class="absolute right-[-10px] md:right-[-25px] z-10 bg-indigo-600 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md hover:bg-indigo-700 transition"
      >
        <img
          src="../../assets/common/rightbtn.png"
          alt="Right"
          class="w-5 h-5"
        />
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";

const reviews = ref([
  {
    text: "Fantastic PC part store! My Ryzen setup arrived quickly and performs like a dream.",
    author: "Gamer Pro",
  },
  {
    text: "Customer service was top-notch. They helped me choose the perfect GPU for my build!",
    author: "Hardware Enthusiast",
  },
  {
    text: "Love the clean UI and fast delivery. Definitely my go-to for PC components now.",
    author: "Tech Builder",
  },
  {
    text: "Got my new SSD here — great price, excellent packaging, and super fast shipping!",
    author: "PC Lover",
  },
  {
    text: "Very reliable and affordable! My gaming rig has never been this smooth.",
    author: "Satisfied User",
  },
  {
    text: "Impressed by the quality of parts and the detailed product info. Makes building PCs easy!",
    author: "DIY Builder",
  },
  {
    text: "Ordered a custom cooling setup — everything arrived safely and works flawlessly. 10/10 store!",
    author: "Satisfied User",
  },
]);

const currentIndex = ref(0);
const visibleCards = ref(getVisibleCards());

function getVisibleCards() {
  const width = window.innerWidth;
  if (width < 600) return 1;
  if (width < 1200) return 2;
  if (width < 1400) return 3;
  return 4;
}

const handleResize = () => {
  visibleCards.value = getVisibleCards();
};
window.addEventListener("resize", handleResize);

const nextSlide = () => {
  if (currentIndex.value < reviews.value.length - visibleCards.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = reviews.value.length - visibleCards.value;
  }
};

onBeforeUnmount(() => window.removeEventListener("resize", handleResize));
</script>

<style scoped></style>
