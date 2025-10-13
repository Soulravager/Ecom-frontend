<template>
  <header class="bg-white shadow w-full sticky top-0 left-0 z-50">
    <div class="flex justify-between items-center h-16 px-4 md:px-10">
      <!-- LOGO place -->

      <MainLogo />

      <!--Button-->
      <button
        @click="open = !open"
        aria-label="Toggle menu"
        class="block text-2xl cursor-pointer border border-gray-300 bg-white text-indigo-600 px-3 py-2 md:hidden rounded-md shadow-sm hover:bg-gray-50"
      >
        <i v-if="!open" class="fa fa-bars"></i>
        <i v-else class="fa fa-times"></i>
      </button>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-6">
        <a href="/" class="text-gray-700 hover:text-indigo-600">Home</a>
        <a href="/Product" class="text-gray-700 hover:text-indigo-600"
          >Products</a
        >
        <a href="/about" class="text-gray-700 hover:text-indigo-600">About</a>
        <a href="/contact" class="text-gray-700 hover:text-indigo-600"
          >Contact</a
        >
        <a
          href="#"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign In
        </a>
      </nav>
    </div>

    <!-- Mobile -->
    <transition name="fade">
      <div v-show="open" class="md:hidden bg-white border-t w-full">
        <div class="px-6 py-4 space-y-2">
          <a href="/" class="block text-gray-700 py-2">Home</a>
          <a href="/Product" class="block text-gray-700 py-2">Products</a>
          <a href="/about" class="block text-gray-700 py-2">About</a>
          <a href="/contact" class="block text-gray-700 py-2">Contact</a>
          <div class="pt-2 border-t mt-2">
            <a
              href="#"
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
import { ref } from "vue";
import MainLogo from "./MainLogo.vue";

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
