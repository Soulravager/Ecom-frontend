<template>
  <section class="bg-gray-50 min-h-screen p-4 md:p-8">
    <div v-if="user" class="text-center mb-10">
      <h1 class="text-2xl md:text-4xl font-bold text-indigo-600">
        Welcome, <span class="text-gray-800">{{ user.name }}</span>
      </h1>
    </div>

    <div class="max-w-4xl mx-auto">
      <h2
        class="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center"
      >
        Your Orders
      </h2>

      <div v-if="loading" class="text-center text-gray-500 py-10">
        Loading your orders...
      </div>

      <div
        v-else-if="orders.length === 0"
        class="text-center text-gray-500 py-10"
      >
        You have no orders yet.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white shadow-md rounded-2xl p-4 md:p-6 border border-gray-100 transition hover:shadow-lg"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 cursor-pointer"
            @click="toggleOrder(order.id)"
          >
            <div>
              <p class="text-gray-800 font-semibold">
                Order ID: <span class="text-indigo-600">#{{ order.id }}</span>
              </p>
              <p class="text-sm text-gray-500">
                Status:
                <span
                  :class="{
                    'text-yellow-500': order.status === 'pending',
                    'text-green-600': order.status === 'completed',
                    'text-red-500': order.status === 'cancelled',
                  }"
                >
                  {{ order.status }}
                </span>
              </p>
              <p class="text-sm text-gray-500">
                Total: ₹{{ order.total_amount }}
              </p>
            </div>

            <button
              class="mt-2 md:mt-0 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <span>{{
                expandedOrderId === order.id ? "Hide Details" : "View Details"
              }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
                :class="
                  expandedOrderId === order.id
                    ? 'rotate-180 transition'
                    : 'transition'
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>

          <div
            v-if="expandedOrderId === order.id"
            class="mt-4 border-t border-gray-200 pt-4 space-y-3"
          >
            <h3 class="font-semibold text-gray-700 text-lg mb-2">
              Order Items
            </h3>

            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex justify-between items-center bg-gray-50 rounded-xl p-3"
            >
              <div class="flex items-center gap-3">
                <img
                  v-if="item.product?.image"
                  :src="item.product.image"
                  alt="Product Image"
                  class="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p class="text-gray-800 font-medium">
                    {{ item.product?.name || "Unknown Product" }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Qty: {{ item.quantity }} × ₹{{ item.price }}
                  </p>
                </div>
              </div>
              <p class="font-semibold text-indigo-600">
                ₹{{ item.quantity * item.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../api/axios";

const user = ref(null);
const orders = ref([]);
const loading = ref(true);
const expandedOrderId = ref(null);

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    products.value = res.data;
    console.log(products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};
const toggleOrder = (id) => {
  expandedOrderId.value = expandedOrderId.value === id ? null : id;
};

const fetchOrders = async () => {
  try {
    const response = await api.get("/orders");
    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
};
onMounted(fetchProducts);
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) user.value = JSON.parse(storedUser);
  fetchOrders();
});
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
