<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { registerGlobalEvents } from '@/events';

const authStore = useAuthStore()
const route = useRoute();

onMounted(() => {
  authStore.checkAuth();
  registerGlobalEvents();
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc]">
    <header v-if="route.name !== 'login' && route.name !== 'register'">
      <nav class="container mx-auto flex justify-between items-center py-4 px-6">
        <RouterLink to="/">
          <img alt="CompanySaver logo" class="h-10 w-auto" src="@/assets/img/logo.png" />
        </RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/login">
          <Button label="Connexion" severity="secondary" />
        </RouterLink>
        <RouterLink v-else to="/" @click="authStore.logout">
          <Button label="Déconnexion" severity="secondary" />
        </RouterLink>
      </nav>
    </header>

    <Toast position="bottom-right" group="br" />
    <main class="flex-grow flex h-svh">
      <RouterView />
    </main>

    <footer v-if="route.name !== 'login'" id="contact" class="bg-white py-4">
      <p class="text-center text-gray-600">&copy; 2024 CompanySaver. Tous droits réservés.</p>
    </footer>
  </div>
</template>
