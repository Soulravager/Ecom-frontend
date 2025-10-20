<template>
  <section class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
      User Accounts
    </h1>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Loading users...
    </div>

    <div
      v-else-if="!isAdmin && users.length === 0"
      class="bg-white shadow-md rounded-xl p-6 text-center border border-red-200"
    >
      <h2 class="text-xl font-semibold text-red-600 mb-2">Access Restricted</h2>
      <p class="text-gray-600">
        This page is for
        <span class="font-bold text-red-600">Admin users only</span>.
      </p>
    </div>

    <div
      v-else
      class="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, email, or ID..."
          class="w-full md:w-1/2 border border-gray-300 text-black rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
        />
        <button
          @click="fetchUsers"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
        >
          Refresh
        </button>
      </div>

      <table class="min-w-full border border-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-left border">ID</th>
            <th class="p-2 text-left border">Name</th>
            <th class="p-2 text-left border">Email</th>
            <th class="p-2 text-left border">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="hover:bg-gray-50 text-gray-700"
          >
            <td class="p-2 border break-words">{{ user.id }}</td>
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.email }}</td>
            <td class="p-2 border">{{ user.role_name }}</td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="filteredUsers.length === 0 && users.length > 0"
        class="text-center py-6 text-gray-500 text-sm"
      >
        No matching users found.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "/src/api/axios.js";

const users = ref([]);
const searchQuery = ref("");
const loading = ref(true);
const isAdmin = ref(true);

const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await api.get("/accounts");
    users.value = res.data.accounts || [];

    if (!users.value.length) {
      isAdmin.value = false;
    }
  } catch (err) {
    console.error("Error:", err);

    if (err.response?.status === 403) {
      isAdmin.value = false;
    }
  } finally {
    loading.value = false;
  }
};

const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
  );
});

onMounted(fetchUsers);
</script>
