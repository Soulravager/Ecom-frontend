<template>
  <form @submit.prevent="registerUser" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Full Name</label>
      <input
        v-model="name"
        type="text"
        placeholder="Enter your name"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input
        v-model="password"
        type="password"
        placeholder="Create a password"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Confirm Password</label
      >
      <input
        v-model="password_confirmation"
        type="password"
        placeholder="Confirm your password"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Sign Up
    </button>

    <p v-if="error" class="text-red-500 text-sm mt-2 text-center">
      {{ error }}
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/axios";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");

const registerUser = async () => {
  error.value = "";
  try {
    const res = await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });

    const token = res.data.access_token;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/";
  } catch (err) {
    error.value = err.response?.data?.message || "Registration failed";
  }
};
</script>
