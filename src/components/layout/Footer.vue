<template>
  <footer class="relative bg-white text-gray-700 border-t border-gray-200 pt-6">
    <div
      class="flex flex-col md:flex-row justify-between items-start px-4 md:px-6 lg:px-0 gap-8 md:gap-12 w-full max-w-[1600px] mx-0"
    >
      <!-- Left -->
      <div class="flex-1 lg:ml-[40px]">
        <MainLogo class="mb-4" />

        <p class="text-sm text-gray-600 leading-6 mb-1">
          Shoppee the E-commerce site.
        </p>
        <p class="text-sm text-gray-600 leading-6">
          Developed by Alvi - Your go-to platform for all things shopping!
        </p>

        <!-- Social -->
        <div class="flex items-center gap-4 mt-5">
          <a href="#" aria-label="Facebook">
            <img :src="fbIcon" alt="Facebook" />
          </a>
          <a href="#" aria-label="X">
            <img :src="xIcon" alt="X" />
          </a>
          <a href="#" aria-label="Instagram">
            <img :src="instaIcon" alt="Instagram" />
          </a>
        </div>
      </div>

      <!-- Links -->
      <div
        class="flex flex-row sm:flex-row gap-20 md:gap-[80px] lg:gap-[100px] md:pt-[.5%] lg:pr-[80px] lg:mr-[80px]"
      >
        <div>
          <h4 class="text-indigo-700 font-semibold text-base mb-4">Home</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="/"
                class="text-gray-600 text-sm hover:text-indigo-600 transition"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="/product"
                class="text-gray-600 text-sm hover:text-indigo-600 transition"
                >Product</a
              >
            </li>
            <li>
              <a
                href="/contact"
                class="text-gray-600 text-sm hover:text-indigo-600 transition"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>

        <!-- Exytra Links -->
        <div>
          <h4 class="text-indigo-700 font-semibold text-base mb-4">Links</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="/our-story"
                class="text-gray-600 text-sm hover:text-indigo-600 transition"
                >Our Story</a
              >
            </li>
            <li>
              <a
                href="/contact"
                class="text-gray-600 text-sm hover:text-indigo-600 transition"
                >Contact Us</a
              >
            </li>
            <li>
              <a
                href="/privacy"
                class="text-gray-600 text-sm hover:text-indigo-600 transition"
                >Privacy Term</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div
      class="bg-indigo-600 text-white text-center mt-6 py-1.5 text-sm font-medium"
    >
      <p>© 2025 Shopee — Built by Alvi</p>
    </div>

    <!--  Top Button -->
    <a
      href="#"
      class="absolute bottom-[10%] md:bottom-[30%] right-8 md:right-20 bg-indigo-600 text-white w-[45px] h-[45px] rounded-full flex justify-center items-center text-lg hover:bg-indigo-700 transition"
      aria-label="Back to top"
    >
      <i class="fas fa-chevron-up"></i>
    </a>
  </footer>
</template>

<script setup>
import MainLogo from "./MainLogo.vue";
import fbIcon from "../../assets/SocialMedia/fb.png";
import xIcon from "../../assets/SocialMedia/x.png";
import instaIcon from "../../assets/SocialMedia/insta.png";
</script>
