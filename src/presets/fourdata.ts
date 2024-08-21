import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';


export default definePreset(Aura, {
    semantic: {
        primary: {
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: 'var(--blue-primary)',
                      contrastColor: '#ffffff',
                      hoverColor: '{blue.900}',
                      activeColor: '{blue.950}'
                }
            }
        }
    },
});