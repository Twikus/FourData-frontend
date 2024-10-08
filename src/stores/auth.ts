import axiosClient from "@/plugins/axios";
import { defineStore } from "pinia";
import { useCookies } from 'vue3-cookies';
import { authCheck, displayError, suffixDomain } from '@/helpers';
import { addEvent } from "@/events";
import router from '@/router';

import type { LoginParams } from '@/interfaces/login';
import type { RegisterParams } from "@/interfaces/register";

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

                addEvent('login-success');

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
        async register(params: RegisterParams) {
            try {
                const response = await axiosClient.post('register', params);

                const { cookies } = useCookies();

                cookies.set(
                    `auth${suffixDomain()}`, 
                    response.data.token,
                    60 * 60 * 4,
                    undefined, 
                    import.meta.env.VITE_DOMAIN
                )
                this.isAuthenticated = true;

                const event = new CustomEvent('register-success');
                window.dispatchEvent(event);

                return 'success';
            } catch (e) {
                displayError(e);
                return e.response.data;
            }
        },
        checkAuth() {
            this.isAuthenticated = authCheck();
        }
    },
})