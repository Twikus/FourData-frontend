import axiosClient from "@/plugins/axios";
import { defineStore } from "pinia";
import { useCookies } from 'vue3-cookies';
import { authCheck, displayError, suffixDomain } from '@/helpers';
import router from '@/router';

import type { LoginParams } from '@/interfaces/login';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: authCheck(),
    }),
    getters: {},
    actions: {
        async login(params: LoginParams) {
            try {
                const response = await axiosClient.post('login', params);
        
                const { cookies } = useCookies();

                cookies.set(
                    `auth${suffixDomain()}`, 
                    response.data.token,
                    60 * 60 * 4,
                    undefined, 
                    import.meta.env.VITE_DOMAIN
                )
                this.isAuthenticated = true;

                const event = new CustomEvent('login-success');
                window.dispatchEvent(event);

                return 'success';
            } catch (e) {
                displayError(e);
                return 'error';
            }
        },
        logout() {
            const { cookies } = useCookies();
            cookies.remove(`auth${suffixDomain()}`, undefined, import.meta.env.VITE_DOMAIN);
            this.$reset();

            router.push({ name: 'home' });
        },
        checkAuth() {
            this.isAuthenticated = authCheck();
        }
    },
})