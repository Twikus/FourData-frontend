import { useToast } from "primevue/usetoast";

export function addEvent(eventName: string) {
    const event = new CustomEvent(eventName);
    window.dispatchEvent(event);
}

export function registerGlobalEvents() {
    const toast = useToast();

    window.addEventListener('login-success', () => {
        toast.add({
        severity: 'success',
        summary: 'Connexion réussie',
        life: 3000,
        group: 'br'
        });
    });

    window.addEventListener('copy-success', () => {
        toast.add({
        severity: 'success',
        summary: 'Copie réussie',
        life: 3000,
        group: 'br'
        });
    });

    window.addEventListener('create-company-success', () => {
        toast.add({
        severity: 'success',
        summary: 'Entreprise créée',
        life: 3000,
        group: 'br'
        });
    });

    window.addEventListener('remove-company-success', () => {
        toast.add({
        severity: 'success',
        summary: 'Entreprise supprimée',
        life: 3000,
        group: 'br'
        });
    });
}