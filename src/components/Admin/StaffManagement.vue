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
          <label class="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              v-model="filters.admin"
              class="rounded text-indigo-600 focus:ring-indigo-400"
            />
            <span>Admin</span>
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
              <td class="p-2 border break-words">{{ user.id.slice(-10) }}</td>
              <td class="p-2 border">{{ user.name }}</td>
              <td class="p-2 border">{{ user.email }}</td>
              <td class="p-2 border text-center">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    user.role_slug === 'staff'
                      ? 'bg-indigo-100 text-indigo-700'
                      : user.role_slug === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700',
                  ]"
                >
                  {{ user.role_name }}
                </span>
              </td>
              <td class="p-2 border text-center space-x-2">
                <template v-if="user.role_slug === 'staff'">
                  <button
                    @click="toggleRole(user)"
                    class="px-3 py-1 rounded-lg bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition"
                  >
                    Make User
                  </button>

                  <button
                    v-if="isAdmin"
                    @click="openSecretModal(user)"
                    class="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs hover:bg-indigo-700 transition"
                  >
                    Make Admin
                  </button>
                </template>

                <template v-else-if="user.role_slug === 'admin'">
                  <button
                    @click="toggleAdmin(user)"
                    class="px-3 py-1 rounded-lg bg-yellow-600 text-white text-xs hover:bg-yellow-700 transition"
                  >
                    Make Staff
                  </button>
                </template>

                <template v-else-if="user.role_slug === 'customer'">
                  <button
                    @click="toggleRole(user)"
                    class="px-3 py-1 rounded-lg bg-yellow-500 text-white text-xs hover:bg-yellow-600 transition"
                  >
                    Make Staff
                  </button>
                </template>

                <button
                  @click="openDeleteModal(user.id)"
                  class="px-[30%] md:px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700 transition"
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
    <!-- admin model -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-lg w-80 md:w-96 relative animate-fade-in text-black"
      >
        <h2 class="text-lg font-semibold text-indigo-700 mb-4 text-center">
          Enter Admin Key
        </h2>

        <div class="relative">
          <input
            v-model="secretKey"
            :type="showSecret ? 'text' : 'password'"
            placeholder="Enter secret key"
            class="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <button
            type="button"
            @click="showSecret = !showSecret"
            class="absolute inset-y-0 right-3 flex items-center justify-center"
          >
            <img
              v-if="showSecret"
              src="/src/assets/component/EyeOpen.svg"
              alt="Show"
              class="w-5 h-5 text-gray-700 hover:opacity-80 transition"
            />
            <img
              v-else
              src="/src/assets/component/EyeClose.svg"
              alt="Hide"
              class="w-5 h-5 text-gray-700 hover:opacity-80 transition"
            />
          </button>
        </div>

        <div class="flex justify-end mt-4 space-x-2">
          <button
            @click="confirmSecret"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
          >
            Confirm
          </button>
          <button
            @click="closeModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <!-- delete model -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-lg w-80 md:w-96 relative animate-fade-in text-black"
      >
        <h2 class="text-lg font-semibold text-red-600 mb-4 text-center">
          Confirm Deletion
        </h2>
        <p class="text-sm text-gray-700 text-center mb-6">
          Are you sure you want to delete this user? <br />
          This action cannot be undone.
        </p>

        <div class="flex justify-center mt-4 space-x-2">
          <button
            @click="deleteUser"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
          >
            Delete
          </button>
          <button
            @click="closeDeleteModal"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
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
  admin: true,
});

const showModal = ref(false);
const secretKey = ref("");
const showSecret = ref(false);
let selectedUser = null;

const openSecretModal = (user) => {
  selectedUser = user;
  showModal.value = true;
  secretKey.value = "";
};

const closeModal = () => {
  showModal.value = false;
  secretKey.value = "";
  selectedUser = null;
};

const showDeleteModal = ref(false);
const userToDelete = ref(null);

const openDeleteModal = (userId) => {
  userToDelete.value = userId;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  userToDelete.value = null;
  showDeleteModal.value = false;
};

const confirmSecret = async () => {
  if (!secretKey.value.trim()) return;

  try {
    const endpoint = `/users/${selectedUser.id}/assign-admin`;
    await api.patch(endpoint, { secret_key: secretKey.value });
    closeModal();
    fetchUsers();
  } catch (err) {
    console.error("Error assigning admin:", err);
    closeModal();
  }
};

const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await api.get("/accounts");
    users.value = res.data.accounts || [];
    if (!users.value.length) isAdmin.value = false;
  } catch (err) {
    if (err.response?.status === 403) isAdmin.value = false;
  } finally {
    loading.value = false;
  }
};

const filteredUsers = computed(() => {
  let filtered = users.value.filter((u) => {
    if (filters.value.staff && u.role_slug === "staff") return true;
    if (filters.value.user && u.role_slug === "customer") return true;
    if (filters.value.admin && u.role_slug === "admin") return true;
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

const toggleAdmin = async (user) => {
  try {
    const endpoint =
      user.role_slug === "admin"
        ? `/users/${user.id}/assign-staff`
        : `/users/${user.id}/assign-admin`;
    await api.patch(endpoint);
    fetchUsers();
  } catch (err) {
    console.error("Error updating admin role:", err);
  }
};

const deleteUser = async () => {
  if (!userToDelete.value) return;

  try {
    await api.delete(`/users/${userToDelete.value}`);
    users.value = users.value.filter((u) => u.id !== userToDelete.value);
    closeDeleteModal();
  } catch (err) {
    console.error("Error deleting user:", err);
    closeDeleteModal();
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 8px;
}

@media (max-width: 767px) {
  td.p-2.border.text-center.space-x-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
}
</style>
