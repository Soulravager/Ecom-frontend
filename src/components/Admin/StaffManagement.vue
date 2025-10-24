<template>
  <section class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
      Staff Management
    </h1>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Loading staff data...
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
    <div v-else>
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
      >
        <div class="flex items-center space-x-4">
          <label class="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              v-model="filters.staff"
              class="rounded text-indigo-600 focus:ring-indigo-400"
            />
            <span>Staff</span>
          </label>

          <label class="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              v-model="filters.user"
              class="rounded text-indigo-600 focus:ring-indigo-400"
            />
            <span>Users</span>
          </label>
        </div>

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
      <div class="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
        <table class="min-w-full border border-gray-200 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-left border">ID</th>
              <th class="p-2 text-left border">Name</th>
              <th class="p-2 text-left border">Email</th>
              <th class="p-2 text-left border">Role</th>
              <th class="p-2 text-center border">Actions</th>
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
              <td class="p-2 border text-center">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    user.role_slug === 'staff'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-green-100 text-green-700',
                  ]"
                >
                  {{ user.role_name }}
                </span>
              </td>
              <td class="p-2 border text-center space-x-2">
                <button
                  @click="toggleRole(user)"
                  class="px-3 py-1 rounded-lg bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition"
                >
                  {{ user.role_slug === "staff" ? "Make User" : "Make Staff" }}
                </button>
                <button
                  @click="deleteUser(user.id)"
                  class="px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="filteredUsers.length === 0 && isAdmin"
          class="text-center py-6 text-gray-500 text-sm"
        >
          No matching users found.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "/src/api/axios.js";

const users = ref([]);
const loading = ref(true);
const isAdmin = ref(true);
const searchQuery = ref("");

const filters = ref({
  staff: true,
  user: true,
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await api.get("/accounts");
    users.value = res.data.accounts || [];

    if (!users.value.length) {
      isAdmin.value = false;
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    if (err.response?.status === 403) {
      isAdmin.value = false;
    }
  } finally {
    loading.value = false;
  }
};

const filteredUsers = computed(() => {
  let filtered = users.value;

  filtered = filtered.filter((u) => {
    if (filters.value.staff && u.role_slug === "staff") return true;
    if (filters.value.user && u.role_slug === "customer") return true;
    return false;
  });

  const q = searchQuery.value.toLowerCase().trim();
  if (q) {
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }

  return filtered;
});

const toggleRole = async (user) => {
  try {
    const endpoint =
      user.role_slug === "staff"
        ? `/users/${user.id}/assign-user`
        : `/users/${user.id}/assign-staff`;

    await api.patch(endpoint);
    fetchUsers();
  } catch (err) {
    console.error("Error updating role:", err);
  }
};

const deleteUser = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await api.delete(`/users/${id}`);
    users.value = users.value.filter((u) => u.id !== id);
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 8px;
}
</style>
