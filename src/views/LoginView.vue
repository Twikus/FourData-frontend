<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { validateEmail } from '@/helpers.js';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';

import type { LoginParams, LoginData } from '../interfaces/login.ts';

const authStore = useAuthStore();
const router = useRouter();

const processing = ref<boolean>(false)

const input = reactive<{
  email: LoginData,
  password: LoginData,
}>({
  email: {
    value: '',
    placeholder: 'Email'
  },
  password: {
    value: '',
    placeholder: 'Mot de passe'
  },
});

const canSubmit = computed(() => {
  if (!processing.value
    && input.email.value != '' 
    && validateEmail(input.email.value)
    && input.password.value != ''
  ) {
    return true;
  }

  return false;
});

async function login() {
  if (!canSubmit.value) {
    return false;
  }

  processing.value = true;

  let params: LoginParams = {
    username: input.email.value,
    password: input.password.value,
  };

  const res: any = await authStore.login(params);

  if (res == 'success') {
    processing.value = false;
  } else {
    console.log(res);
    processing.value = false;
    input.password.value = '';
  }
}
</script>

<template>
  <div class="container-login">
    <div class="login-container">
      <h1 class="poppins-semibold">Connexion à CompanySaver</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="input.email.value" :placeholder="input.email.placeholder" required />
        </div>

        <div class="input-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="input.password.value" :placeholder="input.password.placeholder" required />
        </div>

        <button type="submit" class="btn btn-primary poppins-semibold">
          Connexion
        </button>
        <RouterLink to="/signup" class="btn btn-secondary poppins-semibold">Pas encore inscrit ? Inscription</RouterLink>

        <RouterLink to="/forgot-password" class="forgot-password-link">Mot de passe oublié ?</RouterLink>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    width: 500px;
    min-height: 300px;
    height: 500px;
    margin: auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 40px;
  }

  .input-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }

  .btn {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 30px 0;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    box-sizing: border-box;

    &.disabled {
      opacity: 0.5;
    }

    &.btn-primary {
      background-color: var(--color-primary);
      color: #fff;
      border: none;

        &:hover {
            background-color: var(--color-primary-dark);
        }
    }

    &.btn-secondary {
      background-color: #fff;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);

        &:hover {
            background-color: #f0efef;
        }
    }
  }

  .forgot-password-link {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: var(--color-primary);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot-password-link:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    .login-container {
      padding: 40px;
    }
  }
}
</style>
