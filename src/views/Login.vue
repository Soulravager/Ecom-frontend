<template>
  <main
    class="flex flex-col md:flex-row items-center justify-center w-full text-gray-800 overflow-hidden py-8 md:py-16"
  >
    <div
      class="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch justify-center w-full px-4 sm:px-6"
    >
      <WelcomeCard
        :title="isLogin ? 'Welcome Back!' : 'Join Us Today!'"
        :message="
          isLogin
            ? 'Sign in to continue Shopping.'
            : 'Create your account to start your Shopping.'
        "
      />

      <!-- Right Card -->
      <section
        class="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 w-full md:w-[400px]"
      >
        <div class="w-full">
          <h1
            class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-5 sm:mb-6 tracking-tight"
          >
            {{ isLogin ? "Login to Your Account" : "Create a New Account" }}
          </h1>

          <!-- Components -->
          <UserLogin v-if="isLogin" />
          <UserSignUP v-else />

          <div class="mt-5 sm:mt-6 text-center border-t pt-3 sm:pt-4">
            <p class="text-gray-600 text-xs sm:text-sm">
              {{
                isLogin ? "Don’t have an account?" : "Already have an account?"
              }}
              <button
                @click="toggleForm"
                class="text-indigo-600 font-semibold hover:underline ml-1"
              >
                {{ isLogin ? "Sign Up" : "Login" }}
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import UserLogin from "../components/User/UserLogin.vue";
import UserSignUP from "../components/User/UserSignUP.vue";
import WelcomeCard from "../components/User/WelcomeCard.vue";

const isLogin = ref(true);
const toggleForm = () => (isLogin.value = !isLogin.value);
</script>
