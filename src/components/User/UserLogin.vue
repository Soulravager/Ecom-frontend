<template>
  <form @submit.prevent="loginUser" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="email"
        type="email"
        id="email"
        placeholder="Enter your email"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        v-model="password"
        type="password"
        id="password"
        placeholder="Enter your password"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Login
    </button>

    <p v-if="error" class="text-red-500 text-sm mt-2 text-center">
      {{ error }}
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/axios";

const email = ref("");
const password = ref("");
const error = ref("");

const loginUser = async () => {
  error.value = "";
  try {
    const res = await api.post("/login", {
      email: email.value,
      password: password.value,
    });
    const token = res.data.access_token;

    localStorage.setItem("authToken", token);

    const userRes = await api.get("/user");
    localStorage.setItem("user", JSON.stringify(userRes.data));

    window.location.href = "/";
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>
