<template>
  <div>
    <center>
      <div v-if="user">
        <div class="text-2xl font-semibold text-indigo-600 m-10 md:text-4xl">
          Welcome,
          <span class="text-gray-700">{{ user.name }}</span>
        </div>
      </div>
    </center>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});
</script>
