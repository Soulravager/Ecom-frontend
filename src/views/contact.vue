<template>
  <div
    class="flex flex-col min-h-screen w-screen bg-sky-400 text-gray-100 overflow-x-hidden"
  >
    <div><Header /></div>
    <h1 class="text-4xl font-bold mb-4"><center>Contact</center></h1>
    <p class="text-lg max-w-2xl text-center"></p>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
</script>
