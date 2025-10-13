<template>
  <section
    class="flex flex-col items-center justify-center bg-indigo-600 text-white rounded-xl shadow-lg px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 w-full md:w-[400px]"
  >
    <div class="text-center">
      <h2 class="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
        {{ title }}
      </h2>
      <p class="text-indigo-100 text-sm sm:text-base leading-relaxed">
        {{ message }}
      </p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>
