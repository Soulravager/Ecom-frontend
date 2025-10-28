<template>
  <transition name="fade">
    <div
      v-if="show"
      class="max-w-5xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl shadow p-4 md:p-6"
    >
      <h2 class="text-lg font-semibold mb-3 text-indigo-700">
        Chat about {{ productName }}
      </h2>

      <div
        ref="chatContainer"
        class="h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50 mb-4 scroll-smooth"
      >
        <div
          v-if="messages.length === 0"
          class="text-gray-400 text-center mt-10"
        >
          Start by asking something about {{ productName }}...
        </div>

        <div v-for="(msg, i) in messages" :key="i" class="mb-2">
          <p v-if="msg.role === 'user'" class="text-right">
            <span
              class="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg inline-block break-words max-w-[80%]"
            >
              {{ msg.text }}
            </span>
          </p>
          <p v-else class="text-left">
            <span
              class="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg inline-block break-words max-w-[80%]"
            >
              {{ msg.text }}
            </span>
          </p>
        </div>

        <div v-if="loading" class="text-gray-500 text-sm italic mt-2">
          Shopee is typing...
        </div>
      </div>

      <div class="flex gap-2">
        <input
          v-model="input"
          @keyup.enter="send"
          type="text"
          placeholder="Ask a question about this product..."
          class="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none text-black"
        />
        <button
          @click="send"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          :disabled="loading"
        >
          {{ loading ? "..." : "Send" }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import api from "../../api/axios";

const props = defineProps({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  show: { type: Boolean, default: false },
});

const emit = defineEmits(["update:messages"]);

const messages = ref([]);
const input = ref("");
const loading = ref(false);
const chatContainer = ref(null);

watch(
  messages,
  async () => {
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  },
  { deep: true }
);

const send = async () => {
  if (!input.value.trim()) return;

  const userMsg = { role: "user", text: input.value };
  messages.value.push(userMsg);
  input.value = "";
  loading.value = true;

  try {
    const res = await api.post("/gemini/chat", {
      product_id: props.productId,
      messages: messages.value,
    });

    messages.value.push({
      role: "model",
      text: res.data.response || "No response from Shopee.",
    });

    emit("update:messages", messages.value);
  } catch (err) {
    console.error("Chat error:", err);
    messages.value.push({
      role: "model",
      text: "Failed to get a response. Try again later.",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scroll-smooth {
  scroll-behavior: smooth;
}
</style>
