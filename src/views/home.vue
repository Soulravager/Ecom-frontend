<template>
  <main class="flex-1 w-screen overflow-x-hidden gap-[60px] flex flex-col">
    <Opensection />
    <InfoSection />
    <MainProducts />
    <!-- <MainProductsDemo /> -->
    <ReviewSection />
  </main>
</template>

<script setup>
import Opensection from "../components/home/Opensection.vue";
import InfoSection from "../components/home/InfoSection.vue";
import MainProducts from "../components/home/MainProducts.vue";
import MainProductsDemo from "../components/home/MainProductsDemo.vue";
import ReviewSection from "../components/home/ReviewSection.vue";
</script>
