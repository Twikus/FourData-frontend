<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth
})
</script>

<template>
  <header>
    <nav>
        <RouterLink to="/">
          <img alt="CompanySaver logo" class="logo poppins-bold" src="@/assets/img/logo.png"/>
        </RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/login">Connexion</RouterLink>
        <RouterLink v-if="authStore.isAuthenticated" to="/" @click="authStore.logout">Déconnexion</RouterLink>
    </nav>
  </header>

  <RouterView class="routerview" />

  <footer id="contact">
      <p>&copy; 2024 CompanySaver. Tous droits réservés.</p>
  </footer>
</template>

<style lang="scss" scoped>
  header {
    background-color: #f8f9fa;
    padding: 10px 0;
    text-align: center;
    height: 10vh;
    width: 100%;

    nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 100%;
      width: 100%;
  
      .logo {
        width: 120px;
      }
    }
  }

  .routerview {
    min-height: 83vh;
  }

  footer {
    background: var(--color-primary);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7vh;
  }

  /* Media queries pour écrans plus larges */
  @media(min-width: 768px) {
    nav {
      padding: 0 40px;
    }

    .logo {
      width: 150px;
    }
  }

</style>
