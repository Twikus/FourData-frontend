<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Company } from '@/interfaces/company';
import CrudButtons from '@/components/Buttons/CrudButtons.vue';
import { getSeverity } from '@/helpers';

const props = defineProps<{
    filters: any,
    statusOptions: { name: string }[],
    selectedCompanies: Company[] | null
}>();

const emit = defineEmits(['update:filters', 'open-create', 'open-delete', 'open-edit']);

function updateStatusFilter(value: any) {
    emit('update:filters', { ...props.filters, status: { value: value ? value.name : null, matchMode: 'equals' } });
}

function openCreate() {
    emit('open-create');
}

function openEdit() {
    emit('open-edit');
}

function openDelete() {
    emit('open-delete');
}
</script>

<template>
    <div class="flex flex-wrap gap-2 items-center justify-center mb-4 md:justify-between">
        <div class="flex flex-col gap-4 w-full mb-4 md:flex-row md:w-max">
            <IconField class="w-full md:w-max">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText class="w-full" v-model="filters['global'].value" placeholder="Rechercher..." />
            </IconField>
            <Select :modelValue="filters['status'].value" @update:modelValue="updateStatusFilter"
                :options="statusOptions" showClear optionLabel="name" placeholder="Filtrer par..."
                class="w-full md:w-56">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex items-center">
                        <Tag :value="slotProps.value" :severity="getSeverity(slotProps.value)" />
                    </div>
                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                </template>
                <template #option="slotProps">
                    <div class="flex items-center">
                        <Tag :value="slotProps.option.name" :severity="getSeverity(slotProps.option.name)" />
                    </div>
                </template>
            </Select>
        </div>
        <div class="w-full md:w-max">
            <CrudButtons :selectedCompanies="selectedCompanies" @open-create="openCreate" @open-delete="openDelete"
                @open-edit="openEdit" />
        </div>
    </div>
</template>