<template>
  <section
    class="min-h-screen px-6 py-12 md:px-16 lg:px-24 flex flex-col items-center"
  >
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-indigo-600 mb-3">
        Contact Us
      </h1>
      <p class="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
        Have questions, feedback, or need help? We’d love to hear from you.
      </p>
    </div>

    <!-- Contact Container -->
    <div
      class="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-12 bg-white rounded-2xl shadow-lg p-6 md:p-10"
    >
      <!-- Left Info Section -->
      <div class="flex-1 space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Get in Touch</h2>
        <p class="text-gray-600 text-sm md:text-base leading-relaxed">
          Our support team is here to assist you with product inquiries,
          feedback, or order-related questions.
        </p>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <i class="fas fa-envelope text-indigo-600 text-xl"></i>
            <span class="text-gray-700">Alwin@Shopee.com</span>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-phone-alt text-indigo-600 text-xl"></i>
            <span class="text-gray-700">+91 98765 43210</span>
          </div>
          <div class="flex items-start gap-3">
            <i class="fas fa-map-marker-alt text-indigo-600 text-xl mt-1"></i>
            <span class="text-gray-700">
              TCR ,<br />
              Kerala, India
            </span>
          </div>
        </div>
      </div>

      <!-- Right Form Section -->
      <div class="flex-1">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Send a Message
        </h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your name"
              required
              class="w-full border border-gray-300 text-gray-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full border border-gray-300 text-gray-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Write your message here..."
              required
              class="w-full border border-gray-300 text-gray-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
          >
            <span v-if="!loading">Send Message</span>
            <span v-else>Sending...</span>
          </button>

          <p
            v-if="successMessage"
            class="text-green-600 font-medium mt-3 text-center"
          >
            {{ successMessage }}
          </p>
          <p
            v-if="errorMessage"
            class="text-red-600 font-medium mt-3 text-center"
          >
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const submitForm = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!form.value.name || !form.value.email || !form.value.message) {
    errorMessage.value = "Please fill all fields.";
    return;
  }

  try {
    loading.value = true;
    const response = await api.post("/contacts", {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    });

    successMessage.value =
      response.data.message || "Message sent successfully!";
    form.value = { name: "", email: "", message: "" };
  } catch (error) {
    console.error(error);
    errorMessage.value =
      error.response?.data?.message ||
      "Failed to send message. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>
