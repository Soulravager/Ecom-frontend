<template>
  <main class="flex-1 w-screen overflow-x-hidden gap-[60px] flex flex-col">
    <OpeningSection />
    <InfoSection />
    <MainProducts />
    <ReviewSection />
  </main>
</template>

<script setup>
import OpeningSection from "../components/home/OpeningSection.vue";
import InfoSection from "../components/home/InfoSection.vue";
import MainProducts from "../components/home/MainProducts.vue";
import ReviewSection from "../components/home/ReviewSection.vue";
</script>
