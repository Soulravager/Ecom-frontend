<template>
  <section class="bg-gray-50 min-h-screen p-4 md:p-8">
    <!-- User Greeting -->
    <div v-if="user" class="text-center mb-8">
      <h1 class="text-2xl md:text-4xl font-bold text-indigo-600">
        Welcome, <span class="text-gray-800">{{ user.name }}</span>
      </h1>
    </div>

    <div class="max-w-5xl mx-auto">
      <h2
        class="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center"
      >
        Your Orders
      </h2>

      <!-- ✅ Compact Filter Bar -->
      <div
        class="bg-white rounded-xl shadow-sm p-3 md:p-4 mb-6 flex flex-col md:flex-row flex-wrap items-center gap-3 md:gap-4 justify-between"
      >
        <!-- Search -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search orders..."
          class="w-full md:w-1/3 p-2 border rounded-md text-sm focus:ring focus:ring-indigo-200 text-black"
        />

        <!-- Date Range -->
        <div
          class="flex w-full md:w-auto gap-2 items-center justify-between md:justify-start"
        >
          <input
            type="date"
            v-model="startDate"
            class="w-1/2 md:w-auto p-2 border rounded-md text-sm text-black"
          />
          <span class="text-gray-500 text-sm">to</span>
          <input
            type="date"
            v-model="endDate"
            class="w-1/2 md:w-auto p-2 border rounded-md text-sm text-black"
          />
        </div>

        <!-- Status -->
        <select
          v-model="statusFilter"
          class="w-full md:w-auto p-2 border rounded-md text-sm focus:ring focus:ring-indigo-200 text-black"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500 py-10">
        Loading your orders...
      </div>

      <!-- Empty -->
      <div
        v-else-if="filteredOrders.length === 0"
        class="text-center text-gray-500 py-10"
      >
        No matching orders found.
      </div>

      <!-- Orders -->
      <div v-else class="space-y-4">
        <OrderDetails
          v-for="order in filteredOrders"
          :key="order.id"
          :order="order"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../api/axios";
import OrderDetails from "../../components/orders/OrderDetails.vue";

const user = ref(null);
const orders = ref([]);
const loading = ref(true);

// Filters
const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");
const statusFilter = ref("");

// Fetch Orders
const fetchOrders = async () => {
  try {
    const response = await api.get("/orders");
    // Sort newest first
    orders.value = response.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
};

// Computed filtered list
const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const searchMatch =
      order.id.toString().includes(searchQuery.value) ||
      order.order_items?.some((item) =>
        item.product?.name
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );

    const orderDate = new Date(order.created_at);
    const fromOk = startDate.value
      ? orderDate >= new Date(startDate.value)
      : true;
    const toOk = endDate.value ? orderDate <= new Date(endDate.value) : true;
    const statusOk = statusFilter.value
      ? order.status === statusFilter.value
      : true;

    return searchMatch && fromOk && toOk && statusOk;
  });
});

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

/* Mobile Optimization */
@media (max-width: 640px) {
  input,
  select {
    font-size: 14px;
    padding: 8px;
  }
  .bg-white {
    border: 1px solid #e5e7eb;
  }
}
</style>
