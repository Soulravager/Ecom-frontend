<template>
  <section
    class="bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10"
  >
    <div
      v-if="!isDesktop"
      class="flex items-center justify-between mb-4 bg-white shadow-sm p-3 rounded-md"
    >
      <button
        class="text-gray-700 hover:text-indigo-600 transition"
        @click="toggleSidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h2 class="text-lg font-semibold text-indigo-700">
        {{ activeTab === "orders" ? "Your Orders" : "Profile" }}
      </h2>
    </div>

    <transition name="slide">
      <div
        v-if="sidebarOpen || isDesktop"
        class="bg-white shadow-lg rounded-2xl p-6 pt-10 border border-gray-100 w-72 md:w-1/4 max-w-sm self-start z-40 fixed md:static top-0 left-0 h-full md:h-auto md:translate-x-0 transform transition-all"
      >
        <div v-if="user" class="text-center mb-8 mt-10 md:mt-0">
          <h1 class="text-2xl font-bold text-indigo-600">
            Welcome,
            <span class="text-gray-800">{{ user.name }}</span>
          </h1>
        </div>

        <nav class="space-y-3">
          <button
            @click="selectTab('orders')"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg transition text-sm font-medium',
              activeTab === 'orders'
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700',
            ]"
          >
            Your Orders
          </button>

          <button
            @click="selectTab('profile')"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg transition text-sm font-medium',
              activeTab === 'profile'
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700',
            ]"
          >
            Profile
          </button>
        </nav>

        <button
          v-if="!isDesktop"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          @click="toggleSidebar"
        >
          ✖
        </button>
      </div>
    </transition>

    <div
      v-if="sidebarOpen && !isDesktop"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-40 z-30"
    ></div>

    <main class="flex-1 w-full max-w-5xl">
      <UserOrders v-if="activeTab === 'orders'" />
      <UserProfile v-else-if="activeTab === 'profile'" />
    </main>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import UserOrders from "../components/User/UserOrders.vue";
import UserProfile from "../components/User/UserData.vue";

const user = ref(null);
const activeTab = ref("orders");
const sidebarOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 780);

const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value);

const selectTab = (tab) => {
  activeTab.value = tab;
  if (!isDesktop.value) sidebarOpen.value = false;
};

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 780;
  if (isDesktop.value) sidebarOpen.value = false;
};

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) user.value = JSON.parse(storedUser);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

@media (max-width: 780px) {
  section {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
