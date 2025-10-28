<template>
  <div
    class="bg-white shadow-md rounded-2xl p-4 md:p-6 border border-gray-100 transition hover:shadow-lg w-full"
  >
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer"
      @click="toggleExpand"
    >
      <div class="w-full sm:w-auto">
        <p class="text-gray-800 font-semibold text-sm sm:text-base break-words">
          Order ID:
          <span class="text-indigo-600">#{{ shortOrderId(order.id) }}</span>
        </p>

        <p class="text-xs sm:text-sm text-gray-500 mt-1">
          Date:
          <span class="font-medium text-gray-700">{{
            formatDate(order.created_at)
          }}</span>
        </p>

        <p class="text-xs sm:text-sm text-gray-500 mt-1">
          Payment Status:
          <span
            :class="{
              'text-yellow-500': order.status === 'pending',
              'text-green-600': order.status === 'completed',
              'text-red-500': order.status === 'failed',
              'text-violet-600': order.status === 'refunded',
            }"
          >
            {{ order.status }}
          </span>
        </p>

        <p
          v-if="isCancelled"
          class="text-xs sm:text-sm text-gray-500 font-medium mt-1"
        >
          Order Status:
          <span class="text-red-500">
            {{
              order.delivery_status === "cancelled_by_user"
                ? "Cancelled by User"
                : "Cancelled by Seller"
            }}</span
          >
        </p>

        <p
          v-else-if="isDelivered"
          class="text-xs sm:text-sm text-gray-600 font-medium mt-1"
        >
          Order Status:
          <span class="text-green-600">
            {{
              order.delivery_status === "delivered" ? "delivered" : "delivered"
            }}</span
          >
        </p>

        <p class="text-xs sm:text-sm text-gray-500 mt-1">
          Total: ₹{{ order.total_amount }}
        </p>
      </div>

      <button
        class="mt-2 sm:mt-0 text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
      >
        <span>{{ expanded ? "Hide Details" : "View Details" }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200"
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
    <div v-if="!isDelivered && !isCancelled" class="mt-4">
      <p class="font-medium text-gray-700 mb-2 text-sm sm:text-base">
        Delivery Status:
      </p>

      <div class="relative flex items-center justify-between">
        <template v-for="(step, index) in steps" :key="index">
          <div class="flex items-center w-full">
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold"
              :class="dotClass(index)"
            ></div>
            <div
              v-if="index < steps.length - 1"
              class="flex-1 h-1 transition-all duration-300"
              :class="lineClass(index)"
            ></div>
          </div>
        </template>
      </div>

      <div
        class="flex gap-[10%] md:gap-[19.5%] text-[10px] sm:text-xs text-gray-600 mt-2"
      >
        <span v-for="label in steps" :key="label">{{ label }}</span>
      </div>
    </div>
    <div v-if="showCancelButton" class="mt-4">
      <button
        @click="openModal"
        :disabled="loading"
        class="px-4 py-2 w-full sm:w-auto bg-red-500 text-white text-xs sm:text-sm rounded-lg hover:bg-red-600 disabled:bg-gray-400 transition"
      >
        {{ loading ? "Cancelling..." : "Cancel Order" }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="expanded" class="mt-4 border-t border-gray-200 pt-4 space-y-3">
        <h3 class="font-semibold text-gray-700 text-sm sm:text-lg mb-2">
          Order Items
        </h3>

        <div
          v-for="item in order.items"
          :key="item.id"
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 rounded-xl p-3 gap-2"
        >
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <img
              v-if="item.product?.image"
              :src="item.product.image"
              alt="Product Image"
              class="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p class="text-gray-800 font-medium text-sm sm:text-base">
                {{ item.product?.name || "Unknown Product" }}
              </p>
              <p class="text-xs sm:text-sm text-gray-500">
                Qty: {{ item.quantity }} × ₹{{ item.price }}
              </p>
            </div>
          </div>
          <p class="font-semibold text-indigo-600 text-sm sm:text-base">
            ₹{{ item.quantity * item.price }}
          </p>
        </div>
      </div>
    </transition>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-lg p-6 w-11/12 sm:w-[400px] text-center animate-fadeIn"
      >
        <h2 class="text-lg font-semibold text-gray-800 mb-3">
          Cancel This Order?
        </h2>
        <p class="text-sm text-gray-600 mb-5">
          Are you sure you want to cancel this order? <br />
          <span class="text-gray-500"
            >Refunds will be issued within 2–19 working days.</span
          >
        </p>

        <div class="flex justify-center gap-4 mt-4">
          <button
            @click="confirmCancel"
            class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
          >
            Yes, Cancel Order
          </button>
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/axios";

const props = defineProps({
  order: { type: Object, required: true },
});

const expanded = ref(false);
const toggleExpand = () => (expanded.value = !expanded.value);

const shortOrderId = (id) => id?.toString().slice(-10).toUpperCase();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const steps = ["Ordered", "Shipped", "On The Way", "Delivered"];
const statusIndex = { pending: 0, shipped: 1, on_the_way: 2, delivered: 3 };
const currentStep = ref(statusIndex[props.order.delivery_status] ?? 0);

const isCancelled = ["cancelled_by_user", "cancelled_by_seller"].includes(
  props.order.delivery_status
);

const isDelivered = ["delivered"].includes(props.order.delivery_status);
const showCancelButton =
  !isCancelled &&
  props.order.delivery_status !== "delivered" &&
  props.order.status !== "failed";

const loading = ref(false);
const showModal = ref(false);

const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);

const dotClass = (index) =>
  index <= currentStep.value
    ? "bg-green-500 text-white"
    : "bg-gray-300 text-gray-600";

const lineClass = (index) =>
  index < currentStep.value ? "bg-green-500" : "bg-gray-300";

const confirmCancel = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Please log in again.");
      return;
    }

    await api.patch(
      `/orders/${props.order.id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    window.location.reload();
  } catch (error) {
    console.error("Cancel error:", error.response?.data || error.message);
    alert(
      "Failed to cancel the order: " +
        (error.response?.data?.message || error.message)
    );
  } finally {
    loading.value = false;
    closeModal();
  }
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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
