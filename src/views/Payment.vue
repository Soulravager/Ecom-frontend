<template>
  <section class="bg-gray-50 min-h-screen py-12 px-4 md:px-16 lg:px-24">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
      <h1 class="text-3xl font-bold text-indigo-700 mb-8 text-center">
        Checkout
      </h1>

      <!-- Cart Summary -->
      <div v-if="cartItems.length" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between items-center border-b py-3"
        >
          <div class="flex items-center gap-4">
            <img
              :src="item.product.image"
              alt=""
              class="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <p class="font-medium text-gray-800">{{ item.product.name }}</p>
              <p class="text-gray-500 text-sm">
                ₹{{ item.product.price }} × {{ item.quantity }}
              </p>
            </div>
          </div>
          <p class="font-semibold text-gray-700">
            ₹{{ item.product.price * item.quantity }}
          </p>
        </div>

        <div
          class="flex justify-between items-center mt-6 text-lg font-semibold text-black"
        >
          <p>Total:</p>
          <p>₹{{ totalAmount }}</p>
        </div>
      </div>

      <!-- Payment -->
      <div v-if="cartItems.length" class="mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Select Payment Method
        </h2>

        <div class="flex flex-col gap-4">
          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="razorpay"
              v-model="paymentType"
              class="text-indigo-600 focus:ring-indigo-500"
            />
            <span class="text-gray-700">Online Payment</span>
          </label>

          <label class="flex items-center gap-3">
            <input
              type="radio"
              value="cod"
              v-model="paymentType"
              class="text-indigo-600 focus:ring-indigo-500"
            />
            <span class="text-gray-700">Cash on Delivery</span>
          </label>
        </div>

        <div class="mt-8 flex justify-center">
          <button
            @click="placeOrder"
            :disabled="isProcessing"
            class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ isProcessing ? "Processing..." : "Place Order" }}
          </button>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500 text-lg">
        Your cart is empty.
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const cartItems = ref([]);
const totalAmount = ref(0);
const paymentType = ref("razorpay");
const isProcessing = ref(false);
const user = ref(null);
const userData = ref(null);

const fetchUserData = async () => {
  try {
    const { data } = await api.get("/user-data");
    userData.value = data.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

const fetchCart = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const { data } = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    cartItems.value = data.items;
    totalAmount.value = data.total_amount;
  } catch (err) {
    console.error("Error loading cart:", err);
  }
};

const placeOrder = async () => {
  const token = localStorage.getItem("authToken");
  if (!userData.value) {
    await fetchUserData();
  }

  try {
    isProcessing.value = true;

    const { data } = await api.post(
      "/orders",
      { payment_type: paymentType.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const order = data.order;

    if (paymentType.value === "razorpay") {
      openRazorpay(order, token);
    } else {
      alert("Order placed with Cash on Delivery!");
      window.location.href = "/profile";
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order.");
  } finally {
    isProcessing.value = false;
  }
};

const openRazorpay = (order, token) => {
  const phone = userData.value?.phone_number || "";

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: order.total_amount * 100,
    currency: "INR",
    name: "Shopee",
    description: "Payment for your order",
    order_id: order.payment_id,
    handler: async function (response) {
      try {
        await api.post(
          "/orders/verify",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        window.location.href = "/profile";
      } catch (err) {
        console.error("Payment verification failed:", err);
        alert("Payment failed. Please try again.");
      }
    },
    prefill: {
      name: user.value?.name || "Guest",
      email: user.value?.email || "guest@example.com",
      contact: phone.length === 10 ? phone : "",
    },
    theme: { color: "#6366F1" },
  };

  const rzp = new Razorpay(options);
  rzp.open();
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const storedUser = localStorage.getItem("user");
  if (storedUser) user.value = JSON.parse(storedUser);

  fetchCart();
  fetchUserData();

  if (!document.querySelector("#razorpay-script")) {
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>

<style scoped>
input[type="radio"] {
  width: 1rem;
  height: 1rem;
}
</style>
