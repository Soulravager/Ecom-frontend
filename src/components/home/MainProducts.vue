<template>
  <section
    class="w-full bg-gray-100 py-12 px-4 md:px-16 lg:px-24 overflow-hidden relative"
  >
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
        Featured Products
      </h2>
      <a
        href="/product"
        class="bg-indigo-600 text-gray-100 text-sm md:text-base font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
      >
        All Products
      </a>
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
            v-for="(product, index) in visibleProducts"
            :key="index"
            :class="`flex-shrink-0 p-4`"
            :style="{ width: `${100 / visibleCards}%` }"
          >
            <div
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <router-link :to="`/item/${product.id}`">
                <div
                  class="bg-[#ffffff] rounded-xl p-5 flex items-center justify-center"
                >
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-40 object-contain"
                  />
                </div>
              </router-link>

              <div class="p-4 text-left">
                <center>
                  <h3 class="font-semibold text-gray-700 text-sm md:text-base">
                    {{ product.name }}
                  </h3>
                </center>
              </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import api from "../../api/axios";

const products = ref([]);
const currentIndex = ref(0);
const autoSlide = ref(null);
const visibleCards = ref(getVisibleCards());

function getVisibleCards() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1200) return 3;
  return 5;
}

const handleResize = () => {
  visibleCards.value = getVisibleCards();
};
window.addEventListener("resize", handleResize);

const visibleProducts = computed(() => {
  return [...products.value, ...products.value, ...products.value];
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % products.value.length;
};
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + products.value.length) % products.value.length;
};

const fetchHotProducts = async () => {
  try {
    const response = await api.get("/new");
    products.value = response.data.hot_products.map((item) => ({
      id: item.product_id,
      name: item.product_name,
      image: item.image ? `${item.image}` : "https://via.placeholder.com/150",
    }));
  } catch (error) {}
};

onMounted(() => {
  fetchHotProducts();
  autoSlide.value = setInterval(nextSlide, 30000);
});

onBeforeUnmount(() => {
  clearInterval(autoSlide.value);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped></style>
