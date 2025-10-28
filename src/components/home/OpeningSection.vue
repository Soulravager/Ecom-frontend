<template>
  <section class="relative w-full h-screen overflow-hidden">
    <video
      autoplay
      muted
      playsinline
      class="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="../../assets/Homepage/1.mp4" type="video/mp4" />
    </video>

    <div
      class="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 md:justify-end pt-[40vh] md:pb-[20vh]"
    >
      <h1 class="text-4xl md:text-7xl font-bold mb-4">Welcome to Shopee</h1>
      <p class="text-lg md:text-3xl">
        Explore our amazing products and services.
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
video {
  object-fit: cover;
}

@media (min-width: 768px) {
  .desktop-bottom {
    justify-content: flex-end !important;
    padding-bottom: 20vh !important;
  }
}
</style>
