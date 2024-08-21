import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Fourdata from '@/presets/fourdata';
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Fourdata,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark-mode',
            cssLayer: false
        }
    }
});

app.use(ToastService);

app.use(createPinia())
app.use(router)

app.mount('#app')
