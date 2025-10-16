<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white">
      <div class="p-4 text-lg font-bold">Admin Dashboard</div>
      <nav>
        <ul>
          <li class="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li class="p-4 hover:bg-gray-700 cursor-pointer">Users</li>
          <li class="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
          <li class="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-100 p-6">
      <header class="mb-6">
        <h1 class="text-2xl font-bold">Welcome to Admin Dashboard</h1>
      </header>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 shadow rounded">
          <h2 class="text-lg font-bold">Card 1</h2>
          <p class="text-gray-600">Some content here...</p>
        </div>
        <div class="bg-white p-4 shadow rounded">
          <h2 class="text-lg font-bold">Card 2</h2>
          <p class="text-gray-600">Some content here...</p>
        </div>
        <div class="bg-white p-4 shadow rounded">
          <h2 class="text-lg font-bold">Card 3</h2>
          <p class="text-gray-600">Some content here...</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
