<template>
  <header class="bg-white shadow w-full fixed top-0 left-0 z-50">
    <div class="flex justify-between items-center h-16 px-4 md:px-10">
      <!-- LOGO place  -->
      <a href="#" class="text-2xl font-extrabold text-indigo-600">E-COM</a>

      <button
        @click="open = !open"
        aria-label="Toggle menu"
        class="block text-2xl cursor-pointer border border-gray-300 bg-white text-indigo-600 px-3 py-2 md:hidden rounded-md shadow-sm hover:bg-gray-50"
        :style="{ backgroundColor: '#ffffff' }"
      >
        <i v-if="!open" class="fa fa-bars"></i>
        <i v-else class="fa fa-times"></i>
      </button>

      <nav class="hidden md:flex items-center space-x-6">
        <a href="/home" class="text-gray-700 hover:text-indigo-600">Home</a>
        <a href="#" class="text-gray-700 hover:text-indigo-600">Products</a>
        <a href="/about" class="text-gray-700 hover:text-indigo-600">About</a>
        <a href="/contact" class="text-gray-700 hover:text-indigo-600"
          >Contact</a
        >
        <a
          href="#"
          class="px-3 py-1 border border-indigo-600 rounded text-indigo-600 hover:bg-indigo-50"
        >
          Login
        </a>
        <a
          href="#"
          class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Sign up
        </a>
      </nav>
    </div>

    <transition name="fade">
      <div v-show="open" class="md:hidden bg-white border-t w-full">
        <div class="px-6 py-4 space-y-2">
          <a href="/home" class="block text-gray-700 py-2">Home</a>
          <a href="#" class="block text-gray-700 py-2">Products</a>
          <a href="/about" class="block text-gray-700 py-2">About</a>
          <a href="/contact" class="block text-gray-700 py-2">Contact</a>
          <div class="pt-2 border-t mt-2">
            <a href="#" class="block text-indigo-600 py-2">Login</a>
            <a
              href="#"
              class="block bg-indigo-600 text-white text-center py-2 rounded mt-2"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
const open = ref(false);
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
