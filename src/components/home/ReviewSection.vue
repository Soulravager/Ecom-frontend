<template>
  <section
    class="w-full bg-gray-100 py-12 px-4 md:px-16 lg:px-24 overflow-hidden relative"
  >
    <!-- Header -->
    <div class="mb-8 text-center md:text-left">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
        Customer Reviews
      </h2>
      <p class="text-gray-500 mt-2 text-sm md:text-base">
        Hear what our satisfied PC enthusiasts say about our products
      </p>
    </div>

    <!-- Carousel -->
    <div class="relative flex items-center justify-center">
      <!-- Left Arrow -->
      <button
        @click="prevSlide"
        class="absolute left-[-10px] md:left-[-25px] z-10 bg-indigo-600 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md hover:bg-indigo-700 transition"
      >
        <img src="../../assets/common/leftbtn.png" alt="Left" class="w-5 h-5" />
      </button>

      <!-- MAIN -->
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
            class="flex-shrink-0 w-full md:w-1/4 p-4"
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

      <!-- Right Arrow -->
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
]);

const currentIndex = ref(0);
const visibleCards = ref(window.innerWidth < 768 ? 1 : 4);

const handleResize = () => {
  visibleCards.value = window.innerWidth < 768 ? 1 : 4;
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
