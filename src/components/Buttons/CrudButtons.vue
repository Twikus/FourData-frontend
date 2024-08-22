<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import type { Company } from '@/interfaces/company';

const props = defineProps<{
    selectedCompanies: Company[] | null;
}>();

const emit = defineEmits(['open-create', 'open-delete', 'open-edit']);

const openCreate = () => {
    emit('open-create');
};

const openDelete = () => {
    emit('open-delete');
};

const openEdit = () => {
    emit('open-edit');
};
</script>

<template>
    <div class="flex flex-col gap-2 md:flex-row">
        <Button label="Nouveau" v-tooltip.top="{ value: 'Ajouter entreprise' }" icon="pi pi-plus" severity="contrast"
            @click="openCreate" />
        <Button label="Éditer"
            v-tooltip.top="!props.selectedCompanies || props.selectedCompanies.length !== 1 ? null : { value: 'Éditer l\'entreprise' }"
            icon="pi pi-pencil" severity="contrast" @click="openEdit"
            :disabled="!props.selectedCompanies || props.selectedCompanies.length !== 1" />
        <Button label="Supprimer"
            v-tooltip.top="!props.selectedCompanies || !props.selectedCompanies.length ? null : { value: 'Supprimer entreprise(s)' }"
            icon="pi pi-trash" severity="danger" @click="openDelete"
            :disabled="!props.selectedCompanies || !props.selectedCompanies.length" />
    </div>
</template>