<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <transition name="slide">
      <aside
        v-if="sidebarOpen || isDesktop"
        class="bg-gray-800 text-white w-64 h-full fixed md:static z-40 flex-shrink-0 flex flex-col overflow-hidden"
      >
        <div
          class="p-4 text-xl font-bold border-b border-gray-700 flex justify-between items-center overflow-hidden"
        >
          <span>Admin Dashboard</span>

          <button
            v-if="!isDesktop"
            class="text-gray-400 hover:text-white transition overflow-hidden"
            @click="toggleSidebar"
          >
            ✖
          </button>
        </div>

        <nav class="flex-1 pb-250 overflow-hidden">
          <ul>
            <li
              v-for="item in menuItems"
              :key="item.name"
              @click="selectTab(item.name)"
              :class="[
                'p-4 cursor-pointer hover:bg-gray-700 transition-all duration-200',
                activeTab === item.name ? 'bg-indigo-600' : '',
              ]"
            >
              {{ item.label }}
            </li>
          </ul>
        </nav>
      </aside>
    </transition>

    <main class="flex-1 p-4 md:p-6 overflow-y-auto">
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
          {{ activeLabel }}
        </h2>
      </div>

      <component :is="currentComponent" />
    </main>

    <div
      v-if="sidebarOpen && !isDesktop"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-40 z-30"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Analytics from "../components/Admin/Analytics.vue";
import Products from "../components/Admin/ProductManagement.vue";
import Orders from "../components/Admin/OrderManagement.vue";
import Staff from "../components/Admin/StaffManagement.vue";
import Users from "../components/Admin/UserManagement.vue";
import FeedBack from "../components/Admin/FeedBack.vue";
const components = {
  Analytics,
  Products,
  Orders,
  Users,
  Staff,
  FeedBack,
};

const activeTab = ref("Analytics");
const sidebarOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

const menuItems = [
  { name: "Analytics", label: "Dashboard " },
  { name: "Products", label: "Products" },
  { name: "Orders", label: "Order Management" },
  { name: "FeedBack", label: "Feedback" },
  { name: "Staff", label: "Staff Management" },
  { name: "Users", label: "Users" },
];

const currentComponent = computed(() => {
  return (
    components[activeTab.value] || {
      template: `<div class='p-6 text-gray-700 text-center'>🚧 Under Construction...</div>`,
    }
  );
});

const activeLabel = computed(() => {
  const found = menuItems.find((i) => i.name === activeTab.value);
  return found ? found.label : "Dashboard";
});

const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value);
const selectTab = (name) => {
  activeTab.value = name;
  if (!isDesktop.value) sidebarOpen.value = false;
};

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) sidebarOpen.value = false;
};

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));
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

@media (min-width: 768px) {
  aside {
    position: static !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
