<template>
  <section class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center">
      User Feedbacks
    </h1>

    <div v-if="loading" class="text-center py-10 text-gray-500">
      Loading feedbacks...
    </div>

    <div v-else>
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, email, or message..."
          class="w-full md:w-1/2 border border-gray-300 text-black rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
        />
        <button
          @click="fetchFeedbacks"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
        >
          Refresh
        </button>
      </div>

      <div class="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
        <table class="min-w-full border border-gray-200 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-left border">Name</th>
              <th class="p-2 text-left border">Email</th>
              <th class="p-2 text-left border">Message</th>
              <th class="p-2 text-left border">Date</th>
              <th class="p-2 text-left border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="fb in filteredFeedbacks"
              :key="fb.id"
              class="hover:bg-gray-50 text-gray-700"
            >
              <td class="p-2 border">{{ fb.name }}</td>
              <td class="p-2 border">{{ fb.email }}</td>
              <td class="p-2 border max-w-xs truncate" :title="fb.message">
                {{ fb.message }}
              </td>
              <td class="p-2 border">
                {{ new Date(fb.created_at).toLocaleString() }}
              </td>
              <td class="p-2 border text-center">
                <button
                  @click="confirmDelete(fb.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="filteredFeedbacks.length === 0 && feedbacks.length > 0"
          class="text-center py-6 text-gray-500 text-sm"
        >
          No matching feedbacks found.
        </div>
      </div>
    </div>

    <BaseModal
      :show="showModal"
      :title="modalTitle"
      :message="modalMessage"
      :confirmText="confirmText"
      closeText="Cancel"
      @close="closeModal"
      @confirm="handleConfirm"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "/src/api/axios.js";
import BaseModal from "/src/components/common/ModelPopup.vue";
import useModal from "/src/components/common/ModelPopup.js";

const feedbacks = ref([]);
const searchQuery = ref("");
const loading = ref(true);

const {
  showModal,
  modalTitle,
  modalMessage,
  confirmText,
  openModal,
  closeModal,
} = useModal();

const deleteId = ref(null);

const fetchFeedbacks = async () => {
  loading.value = true;
  try {
    const res = await api.get("/contacts");
    feedbacks.value = (res.data || []).sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id) => {
  deleteId.value = id;
  openModal(
    "Delete Feedback?",
    "Are you sure you want to delete this feedback?",
    "Yes"
  );
};

const handleConfirm = async () => {
  if (!deleteId.value) return;

  try {
    await api.delete(`/contacts/${deleteId.value}`);
    feedbacks.value = feedbacks.value.filter((f) => f.id !== deleteId.value);
  } catch (err) {
    openModal("Error", "Failed to delete feedback. Please try again later.");
    return;
  }

  closeModal();
  deleteId.value = null;
};

const filteredFeedbacks = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  return feedbacks.value.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.email.toLowerCase().includes(q) ||
      f.message.toLowerCase().includes(q)
  );
});

onMounted(fetchFeedbacks);
</script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>
