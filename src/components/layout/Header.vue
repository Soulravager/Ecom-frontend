<template>
  <header class="bg-white shadow w-full sticky top-0 left-0 z-50">
    <div class="flex justify-between items-center h-16 px-4 md:px-10">
      <MainLogo />

      <button
        @click="open = !open"
        aria-label="Toggle menu"
        class="block text-2xl cursor-pointer border border-gray-300 bg-white text-indigo-600 px-3 py-2 md:hidden rounded-md shadow-sm hover:bg-gray-50"
      >
        <i v-if="!open" class="fa fa-bars"></i>
        <i v-else class="fa fa-times"></i>
      </button>

      <nav class="hidden md:flex items-center space-x-6 relative">
        <a href="/" class="text-gray-700 hover:text-indigo-600">Home</a>
        <a href="/product" class="text-gray-700 hover:text-indigo-600"
          >Products</a
        >
        <a href="/about" class="text-gray-700 hover:text-indigo-600">About</a>
        <a href="/contact" class="text-gray-700 hover:text-indigo-600"
          >Contact</a
        >
        <div v-if="user">
          <a href="/cart" class="text-gray-700 hover:text-indigo-600"
            ><CartLogo
          /></a>
        </div>

        <div v-if="user" class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
          >
            <span> {{ user.name }}</span>
            <i class="fa fa-caret-down"></i>
          </button>

          <transition name="fade">
            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50"
            >
              <a
                href="/profile"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                >Profile</a
              >
              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Logout
              </button>
            </div>
          </transition>
        </div>

        <a
          v-else
          href="/login"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign In
        </a>
      </nav>
    </div>

    <transition name="fade">
      <div v-show="open" class="md:hidden bg-white border-t w-full">
        <div class="px-6 py-4 space-y-2">
          <a href="/" class="block text-gray-700 py-2">Home</a>
          <a href="/product" class="block text-gray-700 py-2">Products</a>
          <a href="/about" class="block text-gray-700 py-2">About</a>
          <a href="/contact" class="block text-gray-700 py-2">Contact</a>

          <div class="pt-2 border-t mt-2">
            <div v-if="user">
              <div v-if="user">
                <a
                  href="/cart"
                  class="block bg-gray-100 text-gray-700 text-center py-2 rounded mb-2 hover:bg-gray-200 transition"
                  >Cart
                </a>
              </div>
              <a
                href="/profile"
                class="block bg-gray-100 text-gray-700 text-center py-2 rounded mb-2 hover:bg-gray-200 transition"
                >Profile</a
              >
              <button
                @click="logout"
                class="block bg-indigo-600 text-white text-center py-2 rounded hover:bg-indigo-700 transition w-full"
              >
                Logout
              </button>
            </div>

            <a
              v-else
              href="/login"
              class="block bg-indigo-600 text-white text-center py-2 rounded hover:bg-indigo-700 transition"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MainLogo from "./MainLogo.vue";
import api from "../../api/axios";
import CartLogo from "../../components/cart/CartLogo.vue";

const open = ref(false);
const dropdownOpen = ref(false);
const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {}
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  user.value = null;
  dropdownOpen.value = false;
  window.location.href = "/login";
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
