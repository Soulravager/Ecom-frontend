<template>
  <div
    class="flex flex-col min-h-screen w-screen bg-sky-400 text-gray-100 overflow-x-hidden"
  >
    <div><Header /></div>

    <main class="flex-1 w-screen overflow-x-hidden">
      <HomeSection />
    </main>

    <div><Footer /></div>
  </div>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import HomeSection from "../components/home/HomeSection.vue";
import Footer from "../components/layout/Footer.vue";
</script>
