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

    window.addEventListener('create-company-already-exists', () => {
        toast.add({
        severity: 'error',
        summary: 'L\'entreprise existe déjà',
        life: 3000,
        group: 'br'
        });
    });

    window.addEventListener('create-company-not-found', () => {
        toast.add({
        severity: 'error',
        summary: 'L\'entreprise n\'existe pas',
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

    window.addEventListener('update-company-success', () => {
        toast.add({
        severity: 'success',
        summary: 'Entreprise mise à jour',
        life: 3000,
        group: 'br'
        });
    });
}