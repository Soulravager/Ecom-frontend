<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-xl p-6 w-80 md:w-96 text-center transform transition-all"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          {{ title }}
        </h2>

        <p class="text-gray-600 mb-6 whitespace-pre-line">{{ message }}</p>

        <div class="flex justify-center gap-4">
          <button
            v-if="confirmText"
            @click="$emit('confirm')"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            {{ confirmText }}
          </button>

          <button
            @click="$emit('close')"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            {{ closeText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: null,
  },
  closeText: {
    type: String,
    default: "OK",
  },
});
defineEmits(["close", "confirm"]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
