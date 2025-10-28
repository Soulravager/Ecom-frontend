<template>
  <section class="bg-gray-50 min-h-screen p-4 md:p-0">
    <div class="max-w-5xl mx-auto">
      <h2
        class="hidden md: text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center"
      >
        Your Orders
      </h2>

      <div
        class="bg-white rounded-xl shadow-sm p-3 md:p-4 mb-6 flex flex-col md:flex-row flex-wrap items-center gap-3 md:gap-4 justify-between"
      >
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search orders..."
          class="w-full md:w-1/3 p-2 border rounded-md text-sm focus:ring focus:ring-indigo-200 text-black"
        />

        <div
          class="flex w-full md:w-auto gap-2 items-center justify-between md:justify-start"
        >
          <input
            type="date"
            v-model="startDate"
            class="w-2/5 md:w-auto p-2 border rounded-md text-sm text-black"
          />
          <span class="text-gray-500 text-sm">to</span>
          <input
            type="date"
            v-model="endDate"
            class="w-2/5 md:w-auto p-2 border rounded-md text-sm text-black"
          />
        </div>

        <select
          v-model="statusFilter"
          class="w-full md:w-auto p-2 border rounded-md text-sm focus:ring focus:ring-indigo-200 text-black"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>
      <div v-if="loading" class="text-center text-gray-500 py-10">
        Loading your orders...
      </div>
      <div
        v-else-if="filteredOrders.length === 0"
        class="text-center text-gray-500 py-10"
      >
        No matching orders found.
      </div>

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

const orders = ref([]);
const loading = ref(true);

const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");
const statusFilter = ref("");

const fetchOrders = async () => {
  try {
    const response = await api.get("/orders");
    orders.value = response.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } finally {
    loading.value = false;
  }
};

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
  fetchOrders();
});
</script>
