<template>
  <section
    class="min-h-screen px-6 py-12 md:px-16 lg:px-24 flex flex-col items-center"
  >
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-indigo-600 mb-3">
        About Shopee
      </h1>
      <p class="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
        Your one-stop destination for premium PC parts — proudly built by
        <strong>Alvi</strong>.
      </p>
    </div>

    <div
      class="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-10"
    >
      <div class="flex-1 flex justify-center">
        <img
          src="../assets/common/3.png"
          alt="PC parts"
          class="rounded-xl w-full md:w-4/5 h-64 md:h-80 object-cover shadow-md"
        />
      </div>

      <div class="flex-1 space-y-5 text-gray-700">
        <h2 class="text-2xl md:text-3xl font-semibold text-indigo-600">
          Built for Builders
        </h2>
        <p class="leading-relaxed">
          At <strong>Shopee</strong>, we specialize in providing high-quality PC
          components for gamers, creators, and tech enthusiasts. From processors
          and graphics cards to cases, coolers, and accessories — everything you
          need for your next build is right here.
        </p>
        <p class="leading-relaxed">
          Founded by <strong>Alvi</strong>, Shopee was created to make PC
          building simpler, more transparent, and more affordable. We’re
          committed to delivering trusted products, expert advice, and unmatched
          customer support.
        </p>
        <p class="leading-relaxed text-indigo-600 font-medium">
          Empowering your build — one part at a time.
        </p>
      </div>
    </div>

    <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <div
        class="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-indigo-600 mb-3">Our Mission</h3>
        <p class="text-gray-700 leading-relaxed">
          To empower every PC builder with the best hardware, knowledge, and
          support to create their perfect setup — no matter their skill level.
        </p>
      </div>

      <div
        class="bg-white rounded-2xl shadow-md p-6 md:p-8 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-indigo-600 mb-3">Our Vision</h3>
        <p class="text-gray-700 leading-relaxed">
          To become India’s most trusted online store for PC components and
          custom builds — where performance meets passion.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>
