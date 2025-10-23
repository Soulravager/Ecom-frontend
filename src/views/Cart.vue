<template>
  <section class="bg-gray-50 min-h-screen p-6 md:p-10">
    <h1 class="text-3xl font-bold text-center text-indigo-700 mb-8">My Cart</h1>

    <div v-if="loading" class="text-center text-gray-500 py-20">
      Loading your cart...
    </div>

    <div
      v-else-if="cartItems.length === 0"
      class="flex flex-col items-center justify-center text-center py-20"
    >
      <img
        src="../assets/common/mtcart.png"
        alt="Empty cart"
        class="w-32 h-32 mb-4 opacity-80"
      />
      <h2 class="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
        Your Cart is empty :(
      </h2>

      <a
        href="/product"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-xl transition"
      >
        Browse Products
      </a>
    </div>
    <div v-else class="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      <div class="flex-1 flex flex-col gap-6">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition flex flex-col md:flex-row p-4 md:p-6 items-center gap-4"
        >
          <img
            v-if="item.product.image"
            :src="item.product.image"
            alt="Product image"
            class="w-32 h-32 object-cover rounded-xl"
          />
          <div
            v-else
            class="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500"
          >
            No Image
          </div>

          <div class="flex-1 text-center md:text-left">
            <h2 class="text-lg font-semibold text-gray-800 mb-1">
              {{ item.product.name }}
            </h2>
            <p class="text-gray-600 text-sm mb-2 line-clamp-2">
              {{ item.product.description }}
            </p>
            <p class="text-indigo-600 font-bold text-lg mb-2">
              ₹ {{ item.product.price }}
            </p>

            <div
              class="flex justify-center md:justify-start items-center gap-3"
            >
              <button
                @click="updateQuantity(item, item.quantity - 1)"
                class="px-3 py-1 bg-gray-500 rounded-lg hover:bg-gray-800 disabled:opacity-90"
                :disabled="item.quantity <= 1"
              >
                <MinusIcon />
              </button>

              <span class="font-medium text-black">{{ item.quantity }}</span>

              <button
                @click="updateQuantity(item, item.quantity + 1)"
                class="px-3 py-1 bg-gray-500 rounded-lg hover:bg-gray-800"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          <button
            @click="removeItem(item.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition mt-4 md:mt-0"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="md:w-1/3">
        <div
          class="bg-white border border-gray-200 rounded-2xl shadow p-6 sticky top-20 flex flex-col gap-4"
        >
          <p
            class="text-xl font-semibold text-gray-800 text-center md:text-left"
          >
            Total: <span class="text-indigo-600">₹ {{ totalAmount }}</span>
          </p>

          <button
            @click="goToPayment"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import PlusIcon from "../assets/component/plus.vue";
import MinusIcon from "../assets/component/minus.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cartItems = ref([]);
const totalAmount = ref(0);
const loading = ref(true);

const fetchCart = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Please log in to view your cart.");
    window.location.href = "/login";
    return;
  }

  try {
    const res = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    cartItems.value = res.data.items;
    totalAmount.value = res.data.total_amount;
  } catch (err) {
    console.error(err);
    alert("Error fetching cart items.");
  } finally {
    loading.value = false;
  }
};

const updateQuantity = async (item, newQty) => {
  if (newQty < 1) return;

  try {
    const token = localStorage.getItem("authToken");
    await api.put(
      `cart/${item.id}`,
      { quantity: newQty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    item.quantity = newQty;
    fetchCart();
  } catch (err) {
    console.error("Error updating cart:", err);
  }
};

const removeItem = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    await api.delete(`/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    cartItems.value = cartItems.value.filter((i) => i.id !== id);
    fetchCart();
  } catch (err) {
    console.error("Error removing item:", err);
  }
};

const goToPayment = () => {
  router.push("/payment");
};

onMounted(fetchCart);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
