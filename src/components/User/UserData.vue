<template>
  <section class="bg-gray-50 min-h-screen p-4 md:p-8">
    <div
      class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Your Contact Information
      </h2>

      <div v-if="loading" class="text-center text-gray-500 py-8">
        Loading your data...
      </div>

      <div
        v-if="error"
        class="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mb-4"
      >
        {{ error }}
      </div>

      <form v-if="!loading" @submit.prevent="updateUserData" class="space-y-5">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="w-full sm:w-1/3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Country Code
            </label>
            <select
              v-model="form.country_code"
              :disabled="!isEditing"
              class="text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
            >
              <option value="">Select</option>
              <option value="91">+91 (India)</option>
              <option value="01">+01 (USA)</option>
              <option value="44">+44 (UK)</option>
              <option value="61">+61 (Australia)</option>
              <option value="81">+81 (Japan)</option>
              <option value="49">+49 (Germany)</option>
              <option value="33">+33 (France)</option>
              <option value="39">+39 (Italy)</option>
              <option value="971">+971 (UAE)</option>
            </select>
          </div>

          <div class="w-full sm:w-2/3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              v-model="form.phone_number"
              :disabled="!isEditing"
              maxlength="10"
              placeholder="10-digit phone number"
              class="text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            v-model="form.address"
            :disabled="!isEditing"
            rows="3"
            placeholder="Enter your address"
            class="text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
          ></textarea>
        </div>

        <div class="w-40">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            v-model="form.pincode"
            :disabled="!isEditing"
            maxlength="6"
            placeholder="Pincode"
            class="text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
          />
        </div>

        <div class="flex flex-wrap gap-3 justify-end mt-6">
          <button
            type="button"
            v-if="!isEditing"
            @click="isEditing = true"
            class="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Edit
          </button>

          <div v-else class="flex gap-3">
            <button
              type="button"
              @click="cancelEdit"
              class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {{ saving ? "Saving..." : "Save" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../api/axios";

const loading = ref(true);
const saving = ref(false);
const error = ref("");
const isEditing = ref(false);
const hasUserData = ref(false);

const form = ref({
  address: "",
  phone_number: "",
  country_code: "",
  pincode: "",
});

const fetchUserData = async () => {
  try {
    const res = await api.get("/user-data");
    if (res.data.data) {
      hasUserData.value = true;
      form.value = {
        address: res.data.data.address || "",
        phone_number: res.data.data.phone_number || "",
        country_code: res.data.data.country_code || "",
        pincode: res.data.data.pincode || "",
      };
    } else {
      hasUserData.value = false;
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load user data";
  } finally {
    loading.value = false;
  }
};

const updateUserData = async () => {
  saving.value = true;
  error.value = "";

  try {
    if (hasUserData.value) {
      await api.patch("/user-data", form.value);
    } else {
      await api.post("/user-data", form.value);
      hasUserData.value = true;
    }

    isEditing.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to save user data";
  } finally {
    saving.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  fetchUserData();
};

onMounted(fetchUserData);
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
