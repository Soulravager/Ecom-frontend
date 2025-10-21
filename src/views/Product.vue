<template>
  <section class="bg-gray-50 min-h-screen p-6 md:p-10">
    <h1 class="text-3xl font-bold text-center text-indigo-700 mb-8">
      Our Products
    </h1>

    <div
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
      >
        <!-- Product Image -->
        <img
          v-if="product.image"
          :src="product.image"
          alt="Product image"
          class="w-full h-56 object-cover rounded-xl mb-4"
        />
        <div
          v-else
          class="w-full h-56 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500"
        >
          No Image
        </div>

        <!-- Product Info -->
        <h2 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {{ product.name }}
        </h2>
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">
          {{ product.description }}
        </p>
        <p class="text-indigo-600 font-bold text-lg mb-4">
          ₹ {{ product.price }}
        </p>

        <!-- Buttons -->
        <div class="mt-auto flex justify-between items-center">
          <button
            @click="viewProduct(product)"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            View
          </button>
          <button
            @click="addToCart(product)"
            class="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const loading = ref(true);

const fetchProducts = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/products");
    products.value = res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

const viewProduct = (product) => {
  router.push(`/products/${product.id}`);
};

const addToCart = (product) => {
  alert(`Added "${product.name}" to cart!`);
};

onMounted(fetchProducts);
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
