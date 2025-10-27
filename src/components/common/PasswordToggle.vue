<template>
  <button
    type="button"
    @click="$emit('toggle')"
    class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
  >
    <!-- Open Icon -->
    <svg
      v-if="!show"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>

    <!-- close Icon -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.973 9.973 0 012.594-4.357m3.092-2.406A9.982 9.982 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.978 9.978 0 01-4.041 5.09M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3l18 18"
      />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>
