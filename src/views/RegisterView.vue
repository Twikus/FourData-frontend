<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { RegisterParams } from '@/interfaces/register';

const router = useRouter();
const authStore = useAuthStore();

const input = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
});

const processing = ref<boolean>(false);
const confirmPassword = ref<string>('');
const errorMessage = ref<string | null>(null);

function goHome() {
    router.push({ name: 'home' });
}

async function register() {
    if (input.password !== confirmPassword.value) {
        errorMessage.value = 'Les mots de passe ne correspondent pas.';
        return;
    }

    processing.value = true;
    let params: RegisterParams = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        password: input.password,
    };

    const res: any = await authStore.register(params);
    processing.value = false;

    if (res == 'success') {
        router.push({ name: 'dashboard' });
    } else {
        input.password = '';
        errorMessage.value = res;
    }
}
</script>

<template>
    <div class="bg-white flex flex-grow items-center justify-center relative">
        <div class="py-8 px-12 w-full max-w-md">
            <h3 class="cursor-pointer mb-6 text-sm static md:absolute md:top-8 md:left-8" @click="goHome">
                <i class="pi pi-arrow-left" style="font-size: 0.7rem"></i>
                <span> Revenir en arrière</span>
            </h3>
            <h1 class="text-2xl font-semibold mb-6 text-center">Inscription à CompanySaver</h1>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label for="firstname" class="block text-gray-700 mb-2">Prénom</label>
                    <InputText id="firstname" v-model="input.firstname" class="w-full" placeholder="John" required />
                </div>
                <div class="mb-4">
                    <label for="lastname" class="block text-gray-700 mb-2">Nom</label>
                    <InputText id="lastname" v-model="input.lastname" class="w-full" placeholder="Doe" required />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 mb-2">Email</label>
                    <InputText id="email" type="email" v-model="input.email" class="w-full"
                        placeholder="user@example.com" required />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 mb-2">Mot de passe</label>
                    <Password id="password" type="password" fluid v-model="input.password" class="w-full" toggleMask
                        placeholder="********" required />
                </div>
                <div class="mb-4">
                    <label for="confirmPassword" class="block text-gray-700 mb-2">Confirmation de mot de passe</label>
                    <Password id="confirmPassword" type="password" fluid v-model="confirmPassword" :feedback="false"
                        toggleMask class="w-full" placeholder="********" required />
                </div>
                <p v-if="errorMessage" class="text-red-500 text-sm mb-4 flex flex-col">
                    <span v-for="message in errorMessage">{{ message }}</span>
                </p>
                <Button type="submit" label="Inscription" icon="pi pi-user" class="w-full mb-4"></Button>
            </form>
        </div>
    </div>
</template>