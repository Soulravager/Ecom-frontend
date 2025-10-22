<template>
  <section class="bg-gray-50 min-h-screen p-6 md:p-10">
    <button
      @click="$router.push('/product')"
      class="mb-4 flex items-center text-indigo-700 font-medium hover:text-indigo-800 transition"
    >
      <backbtn />
      Back to Products
    </button>

    <div v-if="loading" class="text-center text-gray-500 py-20 text-lg">
      Loading product details...
    </div>

    <div v-else-if="!product" class="text-center text-gray-500 py-20 text-lg">
      Product not found.
    </div>

    <div
      v-else
      class="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-6 md:p-10 flex flex-col md:flex-row gap-8"
    >
      <img
        v-if="product.image"
        :src="product.image"
        alt="Product image"
        class="w-full md:w-1/2 h-80 object-contain rounded-xl bg-white"
      />

      <div
        v-else
        class="w-full md:w-1/2 h-72 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500"
      >
        No Image
      </div>

      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          {{ product.name }}
        </h1>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>

        <p class="text-indigo-600 font-bold text-2xl mb-6">
          ₹ {{ product.price }}
        </p>

        <div class="flex items-center gap-3 mb-6">
          <span class="text-gray-700 font-medium">Stock:</span>
          <span :class="product.stock > 1 ? 'text-green-600' : 'text-red-600'">
            {{ product.stock > 1 ? "Available" : "Out of Stock" }}
          </span>
        </div>

        <button
          @click="addToCart"
          :disabled="product.stock <= 1"
          class="bg-green-500 hover:bg-green-600 text-white text-sm md:text-base px-6 py-3 rounded-lg transition disabled:opacity-60"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";
import backbtn from "../assets/component/backbtn.vue";

const route = useRoute();
const product = ref(null);
const loading = ref(true);

const fetchProduct = async () => {
  try {
    const res = await api.get(`/products/${route.params.id}`);
    product.value = res.data;
  } catch (err) {
    console.error("Error fetching product:", err);
  } finally {
    loading.value = false;
  }
};

const addToCart = async () => {
  try {
    await api.post("/cart", {
      product_id: product.value.id,
      quantity: 1,
    });
    alert(`Added "${product.value.name}" to your cart!`);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  fetchProduct();
});
</script>
