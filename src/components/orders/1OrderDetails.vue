<template>
  <div
    class="bg-white shadow-md rounded-2xl p-4 md:p-6 border border-gray-100 transition hover:shadow-lg"
  >
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 cursor-pointer"
      @click="toggleExpand"
    >
      <!-- Left Section -->
      <div>
        <!-- Order ID -->
        <p class="text-gray-800 font-semibold">
          Order ID:
          <span class="text-indigo-600">#{{ shortOrderId(order.id) }}</span>
        </p>

        <!-- Date Above Status -->
        <p class="text-sm text-gray-500">
          Date:
          <span class="font-medium text-gray-700">{{
            formatDate(order.created_at)
          }}</span>
        </p>

        <!-- Status -->
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

        <!-- Total -->
        <p class="text-sm text-gray-500">Total: ₹{{ order.total_amount }}</p>
      </div>

      <!-- Toggle Button -->
      <button
        class="mt-2 md:mt-0 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
      >
        <span>{{ expanded ? "Hide Details" : "View Details" }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 transition-transform duration-200"
          :class="{ 'rotate-180': expanded }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </div>

    <!-- Order Items (Expandable Section) -->
    <transition name="fade">
      <div v-if="expanded" class="mt-4 border-t border-gray-200 pt-4 space-y-3">
        <h3 class="font-semibold text-gray-700 text-lg mb-2">Order Items</h3>

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
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const expanded = ref(false);
const toggleExpand = () => {
  expanded.value = !expanded.value;
};

// ✅ Show last 10 digits of order ID
const shortOrderId = (id) => {
  const idStr = id.toString();
  return idStr.slice(-10).toUpperCase();
};

// ✅ Format date nicely
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
