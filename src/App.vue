<template>
  <div
    class="flex flex-col min-h-screen w-screen bg-gray-100 text-gray-100 overflow-x-hidden"
  >
    <div><Header /></div>

    <div class="flex-1 w-screen overflow-x-hidden"><router-view /></div>

    <div><Footer /></div>
  </div>
</template>
<script setup>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
</script>
