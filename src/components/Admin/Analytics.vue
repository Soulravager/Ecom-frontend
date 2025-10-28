<template>
  <section class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
      Dashboard Overview
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
    >
      <div
        v-for="card in statsCards"
        :key="card.title"
        class="bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center text-center transition hover:shadow-lg"
      >
        <p class="text-gray-600 text-sm md:text-base">{{ card.title }}</p>
        <h2
          class="text-xl md:text-2xl font-bold text-indigo-600 mt-2 break-words"
        >
          {{ card.value }}
        </h2>
      </div>
    </div>

    <div class="bg-white p-5 md:p-6 rounded-xl shadow-md mb-8">
      <h2
        class="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center md:text-left"
      >
        Most Sold products
      </h2>

      <form
        @submit.prevent="fetchSalesStats"
        class="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center md:justify-start gap-4"
      >
        <div class="flex flex-col w-full sm:w-auto">
          <label class="text-sm text-gray-900 mb-1">From Date</label>
          <input
            v-model="filters.from_date"
            type="date"
            class="border border-gray-900 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 w-full sm:w-48"
          />
        </div>
        <div class="flex flex-col w-full sm:w-auto">
          <label class="text-sm text-gray-900 mb-1">To Date</label>
          <input
            v-model="filters.to_date"
            type="date"
            class="border border-gray-900 text-black rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 w-full sm:w-48"
          />
        </div>
        <button
          type="submit"
          class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg mt-2 sm:mt-6 transition"
        >
          Filter
        </button>
      </form>
    </div>

    <div
      v-if="salesStats"
      class="bg-white p-5 md:p-6 rounded-xl shadow-md overflow-hidden"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center md:text-left"
      >
        Sales Statistics
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 border rounded-lg">
          <p class="text-gray-800 text-sm">Product Name</p>
          <p class="text-lg font-semibold break-words text-gray-600">
            {{ salesStats.product_name }}
          </p>
        </div>
        <div class="p-4 border rounded-lg">
          <p class="text-gray-800 text-sm">Total Quantity Sold</p>
          <p class="text-lg font-semibold text-gray-600">
            {{ salesStats.total_quantity }}
          </p>
        </div>
        <div class="p-4 border rounded-lg">
          <p class="text-gray-800 text-sm">Purchase Count</p>
          <p class="text-lg font-semibold text-gray-600">
            {{ salesStats.purchase_count }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="lowStock.length"
      class="bg-white p-5 md:p-6 rounded-xl shadow-md mt-8 overflow-x-auto"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-red-600 mb-4 text-center md:text-left"
      >
        Low Stock Products
      </h2>

      <table
        class="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2 text-left whitespace-nowrap">Product Name</th>
            <th class="border p-2 text-left whitespace-nowrap">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in lowStock"
            :key="p.id"
            class="hover:bg-gray-50 border-b"
          >
            <td class="border p-2">{{ p.name }}</td>
            <td class="border p-2">{{ p.stock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "/src/api/axios.js";

const statsCards = ref([
  { title: "Total Users", value: "..." },
  { title: "Total Orders", value: "..." },
  { title: "Total Sales", value: "..." },
  { title: "Net Stock", value: "..." },
]);

const filters = ref({
  from_date: "",
  to_date: "",
});

const salesStats = ref(null);
const lowStock = ref([]);

const fetchStats = async () => {
  try {
    const res = await api.get("/dashboard/stats");
    const data = res.data;
    statsCards.value = [
      { title: "Total Users", value: data.total_users },
      { title: "Total Orders", value: data.total_orders },
      { title: "Total Sales", value: "₹" + data.total_sales },
      { title: "Net Stock", value: data.net_stock },
    ];
  } catch (error) {}
};

const fetchLowStock = async () => {
  try {
    const res = await api.get("/dashboard/stockstat");
    lowStock.value = res.data.low_stock_products || [];
  } catch (error) {}
};

const fetchSalesStats = async () => {
  try {
    const res = await api.post("/dashboard/salestat", {
      from_date: filters.value.from_date,
      to_date: filters.value.to_date,
    });
    salesStats.value = res.data.sales_stats;
  } catch (error) {
    salesStats.value = null;
  }
};

onMounted(() => {
  fetchStats();
  fetchLowStock();
});
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(40%) sepia(60%) saturate(500%) hue-rotate(220deg);
}
</style>
