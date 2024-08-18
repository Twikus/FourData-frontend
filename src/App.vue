<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore()
const route = useRoute();

const toast = useToast();

window.addEventListener('login-success', () => {
  toast.add({
    severity: 'success',
    summary: 'Connexion réussie',
    life: 3000,
    group: 'br'
  });
});

onMounted(() => {
  authStore.checkAuth();
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc]">
    <header v-if="route.name !== 'login'">
      <nav class="container mx-auto flex justify-between items-center py-4">
        <RouterLink to="/">
          <img alt="CompanySaver logo" class="h-10 w-auto" src="@/assets/img/logo.png"/>
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
    <main class="flex-grow flex">
      <RouterView />
    </main>

    <footer v-if="route.name !== 'login'" id="contact" class="bg-white py-4">
      <p class="text-center text-gray-600">&copy; 2024 CompanySaver. Tous droits réservés.</p>
    </footer>
  </div>
</template>
