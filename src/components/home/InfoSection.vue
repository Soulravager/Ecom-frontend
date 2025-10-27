<template>
  <section
    class="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-10 bg-gray-100"
  >
    <div
      class="flex flex-col items-start md:w-1/2 text-center md:text-left space-y-5"
    >
      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
      >
        Choose Our Top Pick products and services.
      </h1>
      <p class="text-gray-600 text-sm md:text-base leading-relaxed">
        Discover high-performance computer hardware for every need. Reliable
        components<br class="hidden md:block" />
        and the latest technology to build your perfect PC.
      </p>

      <div class="w-full flex justify-center md:justify-start">
        <a
          href="/product"
          class="inline-block bg-indigo-600 text-white text-sm md:text-base font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Products
        </a>
      </div>

      <div class="flex flex-row gap-10 mt-6 justify-center md:justify-start">
        <div class="flex flex-col items-center md:items-start text-gray-700">
          <div class="flex items-center gap-3">
            <img
              src="../../assets/common/2.png"
              alt="Total Product"
              class="w-10 h-10 object-contain"
            />
            <h2 class="text-2xl font-semibold text-gray-800">5000+</h2>
          </div>
          <p class="text-sm mt-1 text-gray-500">Total Products</p>
        </div>

        <div class="flex flex-col items-center md:items-start text-gray-700">
          <div class="flex items-center gap-3">
            <SimleEmo />
            <h2 class="text-2xl font-semibold text-gray-800">60000+</h2>
          </div>
          <p class="text-sm mt-1 text-gray-500">Happy Customers</p>
        </div>
      </div>
    </div>

    <div class="md:w-1/2 flex justify-center mb-8 md:mb-0">
      <img
        src="../../assets/common/3.png"
        alt="Cleaning Image"
        class="w-4/5 md:w-full max-w-md lg:max-w-lg object-contain"
      />
    </div>
  </section>
</template>

<script setup>
import SimleEmo from "../common/HomeEmoji.vue";
</script>
