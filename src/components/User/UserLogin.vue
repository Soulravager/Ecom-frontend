<template>
  <form @submit.prevent="loginUser" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="email"
        type="text"
        id="email"
        placeholder="Enter your email"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      <p v-if="emailError" class="text-red-500 text-sm mt-1">
        {{ emailError }}
      </p>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <div class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Enter your password"
          class="w-full mt-1 border border-gray-300 rounded-lg p-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <PasswordToggle :show="showPassword" @toggle="togglePassword" />
      </div>
      <p v-if="passwordError" class="text-red-500 text-sm mt-1">
        {{ passwordError }}
      </p>
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
import PasswordToggle from "../common/PasswordToggle.vue";

const email = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);

const emailError = ref("");
const passwordError = ref("");

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const validateInputs = () => {
  let valid = true;
  emailError.value = "";
  passwordError.value = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = "Email is required";
    valid = false;
  } else if (!emailPattern.test(email.value)) {
    emailError.value = "Please enter a valid email address";
    valid = false;
  }

  if (!password.value) {
    passwordError.value = "Password is required";
    valid = false;
  } else if (password.value.length < 4) {
    passwordError.value = "Password must be at least 4 characters long";
    valid = false;
  }

  return valid;
};

const loginUser = async () => {
  error.value = "";
  if (!validateInputs()) return;

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
