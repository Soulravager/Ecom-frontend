<template>
  <section class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
      Order Management
    </h1>
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
    >
      <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Order ID or User ID..."
          class="w-full md:w-64 border border-gray-300 text-black rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
        />
        <select
          v-model="statusFilter"
          class="w-full md:w-40 border border-gray-300 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Payment</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          v-model="deliveryFilter"
          class="w-full md:w-44 border border-gray-300 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Delivery</option>
          <option value="pending">Ordered</option>
          <option value="shipped">Shipped</option>
          <option value="on_the_way">On The Way</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled_by_seller">Cancelled</option>
        </select>

        <select
          v-model="orderView"
          class="w-full md:w-48 border border-gray-300 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
        >
          <option value="current">Active Orders</option>
          <option value="all">All Orders</option>
          <option value="cancelled">Cancelled Orders</option>
          <option value="delivered">Delivered Orders</option>
        </select>
      </div>

      <button
        @click="refreshOrders"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition w-full md:w-auto"
      >
        Refresh
      </button>
    </div>

    <div class="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
      <table class="min-w-full border border-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-left border">Order ID</th>
            <th class="p-2 text-left border">User ID</th>
            <th class="p-2 text-left border">Payment Method</th>
            <th class="p-2 text-left border">Total Amount</th>
            <th class="p-2 text-left border">Payment Status</th>
            <th class="p-2 text-left border">Delivery Status</th>
            <th class="p-2 text-center border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="hover:bg-gray-50 text-gray-700"
          >
            <td class="p-2 border font-medium">{{ order.id.slice(-10) }}</td>
            <td class="p-2 border">{{ order.user_id.slice(-10) }}</td>
            <td class="p-2 border">
              {{
                order.payment_type
                  .replaceAll("cod", "Cash On Delivery")
                  .replaceAll("razorpay", "Razorpay GateWay")
              }}
            </td>
            <td class="p-2 border">₹ {{ order.total_amount }}</td>
            <td class="p-2 border capitalize">{{ order.status }}</td>
            <td class="p-2 border capitalize">
              {{ order.delivery_status.replaceAll("_", " ") }}
            </td>
            <td class="p-2 border text-center space-x-2">
              <button
                @click="openEditModal(order)"
                class="px-3 py-1 rounded-lg bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition"
              >
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="filteredOrders.length === 0"
        class="text-center py-6 text-gray-500 text-sm"
      >
        No matching orders found.
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-900 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">
          Update Order Status
        </h2>

        <form @submit.prevent="updateOrderStatus" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-1"
              >Payment Status</label
            >
            <select
              v-model="form.status"
              class="w-full border rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1"
              >Delivery Status</label
            >
            <select
              v-model="form.delivery_status"
              class="w-full border rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-indigo-400"
              :disabled="form.delivery_status === 'cancelled_by_user'"
            >
              <option
                v-if="form.delivery_status === 'cancelled_by_user'"
                value="cancelled_by_user"
              >
                Cancelled by User
              </option>
              <template v-else>
                <option value="">Select Delivery Status</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="on_the_way">On The Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled_by_seller">Cancelled</option>
              </template>
            </select>
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "/src/api/axios.js";

const orders = ref([]);
const showModal = ref(false);
const editId = ref(null);
const searchQuery = ref("");
const statusFilter = ref("");
const deliveryFilter = ref("");
const orderView = ref("current");
const form = ref({
  status: "",
  delivery_status: "",
});

const fetchOrders = async () => {
  try {
    const res = await api.get("/admin/orders");
    orders.value = res.data || [];
  } catch (err) {}
};

const refreshOrders = async () => {
  await fetchOrders();
};

const openEditModal = (order) => {
  editId.value = order.id;
  form.value.status = order.status;
  form.value.delivery_status = order.delivery_status;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = { status: "", delivery_status: "" };
  editId.value = null;
};

const updateOrderStatus = async () => {
  try {
    if (form.value.status) {
      await api.patch(`/orders/${editId.value}/status`, {
        status: form.value.status,
      });
    }

    if (
      form.value.delivery_status &&
      form.value.delivery_status !== "cancelled_by_user"
    ) {
      await api.patch(`/orders/${editId.value}/delivery-status`, {
        delivery_status: form.value.delivery_status,
      });
    }

    await fetchOrders();
    closeModal();
  } catch (err) {}
};

const filteredOrders = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return orders.value.filter((o) => {
    const idMatch =
      String(o.id).toLowerCase().includes(q) ||
      String(o.user_id).toLowerCase().includes(q);
    const statusMatch = !statusFilter.value || o.status === statusFilter.value;
    const deliveryMatch =
      !deliveryFilter.value || o.delivery_status === deliveryFilter.value;

    const isDelivered =
      o.delivery_status === "delivered" && o.status === "completed";
    const isCancelled =
      ["cancelled_by_user", "cancelled_by_seller"].includes(
        o.delivery_status
      ) && ["cancelled", "refunded"].includes(o.status);

    let viewMatch = true;
    if (orderView.value === "delivered") viewMatch = isDelivered;
    else if (orderView.value === "cancelled") viewMatch = isCancelled;
    else if (orderView.value === "current")
      viewMatch = !isDelivered && !isCancelled;

    return idMatch && statusMatch && deliveryMatch && viewMatch;
  });
});

onMounted(fetchOrders);
</script>

<style scoped>
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 8px;
}
</style>
