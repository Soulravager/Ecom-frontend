<template>
  <form class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Full Name</label
      >
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        type="password"
        id="password"
        placeholder="Create a password"
        class="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Sign Up
    </button>
  </form>
</template>

<script setup>
// Basic signup form — logic can be added later
</script>
