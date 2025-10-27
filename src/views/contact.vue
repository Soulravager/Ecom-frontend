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
              @input="validateField('name')"
              required
              class="w-full border border-gray-300 text-gray-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              @input="validateField('email')"
              required
              class="w-full border border-gray-300 text-gray-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Write your message here..."
              @input="validateField('message')"
              required
              class="w-full border border-gray-300 text-gray-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">
              {{ errors.message }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
          >
            <span v-if="!loading">Send Message</span>
            <span v-else>Sending...</span>
          </button>
        </form>
      </div>
    </div>

    <BaseModal
      :show="showModal"
      :title="modalTitle"
      :message="modalMessage"
      closeText="Close"
      @close="closeModal"
    >
      <template #actions>
        <div class="flex justify-center">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm"
          >
            Close
          </button>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";
import BaseModal from "../components/common/ModelPopup.vue";
import useModal from "../components/common/ModelPopup.js";

const { showModal, modalTitle, modalMessage, openModal, closeModal } =
  useModal();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const errors = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);

const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (field) => {
  switch (field) {
    case "name":
      if (!form.value.name.trim()) {
        errors.value.name = "Name is required.";
      } else if (!nameRegex.test(form.value.name.trim())) {
        errors.value.name =
          "Name must have at least 3 letters and no special characters.";
      } else {
        errors.value.name = "";
      }
      break;
    case "email":
      if (!form.value.email.trim()) {
        errors.value.email = "Email is required.";
      } else if (!emailRegex.test(form.value.email.trim())) {
        errors.value.email = "Please enter a valid email address.";
      } else {
        errors.value.email = "";
      }
      break;
    case "message":
      if (!form.value.message.trim()) {
        errors.value.message = "Message cannot be empty.";
      } else {
        errors.value.message = "";
      }
      break;
  }
};

const submitForm = async () => {
  validateField("name");
  validateField("email");
  validateField("message");

  if (errors.value.name || errors.value.email || errors.value.message) return;

  try {
    loading.value = true;

    const response = await api.post("/contacts", {
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      message: form.value.message.trim(),
    });

    openModal(
      "Message Sent!",
      response.data.message || "Your message has been sent successfully."
    );

    form.value = { name: "", email: "", message: "" };
  } catch (error) {
    console.error("Error sending message:", error);
    openModal(
      "Error",
      error.response?.data?.message ||
        "Failed to send message. Please try again later."
    );
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
