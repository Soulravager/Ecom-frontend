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
      <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="email"
        type="text"
        placeholder="Enter your email"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      <p v-if="emailError" class="text-red-500 text-sm mt-1">
        {{ emailError }}
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <div class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Create a password"
          class="w-full mt-1 border border-gray-300 rounded-lg p-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <PasswordToggle :show="showPassword" @toggle="togglePassword" />
      </div>
      <p v-if="passwordError" class="text-red-500 text-sm mt-1">
        {{ passwordError }}
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700"
        >Confirm Password</label
      >
      <div class="relative">
        <input
          v-model="password_confirmation"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirm your password"
          class="w-full mt-1 border border-gray-300 rounded-lg p-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <PasswordToggle
          :show="showConfirmPassword"
          @toggle="toggleConfirmPassword"
        />
      </div>
      <p v-if="confirmError" class="text-red-500 text-sm mt-1">
        {{ confirmError }}
      </p>
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
import PasswordToggle from "./Reso/PasswordToggle.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmError = ref("");

const togglePassword = () => (showPassword.value = !showPassword.value);
const toggleConfirmPassword = () =>
  (showConfirmPassword.value = !showConfirmPassword.value);

const validateInputs = () => {
  let valid = true;
  nameError.value = "";
  emailError.value = "";
  passwordError.value = "";
  confirmError.value = "";

  const namePattern = /^[A-Za-z\s]{2,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name.value) {
    nameError.value = "Name is required";
    valid = false;
  } else if (!namePattern.test(name.value)) {
    nameError.value =
      "Name must contain only letters and at least 2 characters";
    valid = false;
  }

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
  } else if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters long";
    valid = false;
  }

  if (!password_confirmation.value) {
    confirmError.value = "Please confirm your password";
    valid = false;
  } else if (password_confirmation.value !== password.value) {
    confirmError.value = "Passwords do not match";
    valid = false;
  }

  return valid;
};

const registerUser = async () => {
  error.value = "";
  if (!validateInputs()) return;

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
