<template>
  <section class="min-h-screen p-6 md:p-10">
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
        <img
          v-if="product.image"
          :src="product.image"
          alt="Product image"
          class="w-60 h-56 object-fit rounded-xl mb-4"
        />
        <div
          v-else
          class="w-full h-56 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500"
        >
          No Image
        </div>

        <h2 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {{ product.name }}
        </h2>
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">
          {{ product.description }}
        </p>
        <p class="text-indigo-600 font-bold text-lg mb-4">
          ₹ {{ product.price }}
        </p>

        <div class="mt-auto flex justify-between items-center">
          <button
            @click="addToCart(product)"
            class="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:bg-red-500"
            :disabled="product.stock <= 1"
          >
            <span v-if="product.stock <= 1">Out of stock</span>
            <span v-else>Add to Cart</span>
          </button>
          <button
            @click="viewProduct(product)"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            View
          </button>
        </div>
      </div>
    </div>

    <BaseModal
      :show="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import { useRouter } from "vue-router";
import BaseModal from "../components/common/ModelPopup.vue";
import useModal from "../components/common/ModelPopup";

const router = useRouter();
const products = ref([]);
const loading = ref(true);
const addingToCartId = ref(null);

const { showModal, modalTitle, modalMessage, openModal, closeModal } =
  useModal();

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    products.value = res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

const viewProduct = (product) => {
  router.push({ name: "ProductShow", params: { id: product.id } });
};

const addToCart = async (product) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    openModal("Login Required", "Please log in to add items to your cart.");
    router.push("/login");
    return;
  }

  addingToCartId.value = product.id;

  try {
    await api.post("/cart", {
      product_id: product.id,
      quantity: 1,
    });
    openModal("Added to Cart", `${product.name} has been added to your cart!`);
  } catch (err) {
    console.error("Error adding to cart:", err);
    if (err.response?.status === 401) {
      openModal("Session Expired", "Please log in again.");
      localStorage.removeItem("authToken");
      router.push("/login");
    } else {
      openModal("Error", "Failed to add to cart. Try again later.");
    }
  } finally {
    addingToCartId.value = null;
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
