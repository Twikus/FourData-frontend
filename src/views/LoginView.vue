<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { validateEmail } from '@/helpers.js';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';

import type { LoginParams, LoginData } from '../interfaces/login.ts';

const authStore = useAuthStore();
const router = useRouter();

const processing = ref<boolean>(false)
const errorMessage = ref<string | null>(null);

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
  processing.value = false;
  if (res == 'success') {
    router.push({ name: 'dashboard' });
  } else {
    input.password.value = '';
    errorMessage.value = 'Identifiants incorrects. Veuillez réessayer.';

    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="bg-white flex flex-grow items-center justify-center relative">
    <div class="py-8 px-12 w-full max-w-md">
      <h3 class="cursor-pointer mb-6 text-sm static md:absolute md:top-8 md:left-8" @click="goBack">
        <i class="pi pi-arrow-left" style="font-size: 0.7rem"></i>
        <span> Revenir en arrière</span>
      </h3>
      <h1 class="text-2xl font-semibold mb-6 text-center">Connexion à CompanySaver</h1>
      <p class="text-center mb-6 text-gray-600">
        <span class="text-600 line-height-3">Pas encore de compte ?</span>
        <RouterLink to="/register" class="font-medium no-underline ml-2 text-blue-500">Inscrivez vous !</RouterLink>
      </p>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <InputText id="email" type="email" v-model="input.email.value" :placeholder="input.email.placeholder"
            class="w-full p-inputtext-sm" required />
        </div>

        <div class="mb-8">
          <label for="password" class="block text-gray-700 mb-2">Mot de passe</label>
          <Password id="password" type="password" v-model="input.password.value" fluid :feedback="false" toggleMask
            :placeholder="input.password.placeholder" class="w-full" required />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <Button type="submit" label="Connexion" icon="pi pi-user" class="w-full mb-4"></Button>

        <!--<RouterLink to="/forgot-password" class="block text-center font-medium no-underline ml-2 text-blue-500">Mot de passe oublié ?</RouterLink>-->
      </form>
    </div>
  </div>
</template>