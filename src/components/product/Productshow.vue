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

      <!-- Details -->
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
        <div class="gap-10">
          <button
            @click="addToCart"
            :disabled="product.stock <= 1"
            class="bg-green-500 hover:bg-green-600 text-white text-sm md:text-base px-6 py-3 rounded-lg transition disabled:opacity-60"
          >
            Add to Cart</button
          ><br class="hidden md:block" />
          <button
            @click="toggleChat"
            class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base px-6 py-3 rounded-lg transition"
          >
            {{ showChat ? "Hide Chat" : `Ask about ${product.name}` }}
          </button>
        </div>
      </div>
    </div>
    <GeminiChat
      v-if="product"
      :product-id="product.id"
      :product-name="product.name"
      :show="showChat"
    />
    <div
      v-if="showModal"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-xl p-6 w-80 text-center transform transition-all"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          {{ modalTitle }}
        </h2>
        <p class="text-gray-600 mb-6">{{ modalMessage }}</p>
        <button
          @click="closeModal"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          OK
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../../api/axios";
import backbtn from "../../assets/component/backbtn.vue";
import GeminiChat from "../Gemini/ProductChat.vue";

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const showChat = ref(false);

const showModal = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");

const openModal = (title, message) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => (showModal.value = false);
const toggleChat = () => (showChat.value = !showChat.value);

const addToCart = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    openModal("Login Required", "Please log in to add items to your cart.");
    return;
  }

  try {
    await api.post("/cart", {
      product_id: product.value.id,
      quantity: 1,
    });
    openModal(
      "Added to Cart",
      `${product.value.name} has been added to your cart!`
    );
  } catch (err) {
    console.error("Error adding to cart:", err);
    if (err.response?.status === 401) {
      openModal("Session Expired", "Please log in again.");
      localStorage.removeItem("authToken");
    } else {
      openModal("Error", "Failed to add to cart. Try again later.");
    }
  }
};

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

onMounted(() => {
  const app = document.getElementById("app");
  if (app && app.scrollTo) {
    app.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  fetchProduct();
});
</script>
