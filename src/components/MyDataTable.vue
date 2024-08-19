<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

import type { Company } from '@/interfaces/company';
import { copyItem } from '@/helpers';

const props = defineProps<{
    companies?: Company[],
    filters?: any
}>();

const selectedCompany = ref<Company[]>([]);
const submitted = ref(false);
const filters = ref({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    status: {value: null, matchMode: FilterMatchMode.EQUALS}
});
const statuses = [
    { name: 'Ouverte'},
    { name: 'Fermée'},
];
const company = ref<Company>({
    id: 0,
    name: '',
    address: '',
    siren: 0,
    siret: 0,
    tvaNumber: '',
    status: false,
});
const companyDialog = ref(false);

const openNew = () => {
    company.value = {
        id: 0,
        name: '',
        address: '',
        siren: 0,
        siret: 0,
        tvaNumber: '',
        status: false,
    };

    submitted.value = false;
    companyDialog.value = true;
};

function confirmDeleteSelected() {
    console.log('confirmDeleteSelected');
}

function getSeverity(status: string) {
    switch (status) {
    case 'Ouverte':
        return 'success';
    case 'Fermée':
        return 'danger';
    default:
        return 'info';
    }
}

function updateStatusFilter(value: any) {
    filters.value.status.value = value ? value.name : null;
}
</script>

<template>
    <div>
        <DataTable
            v-if="props.companies && props.companies.length > 0"
            v-model:selection="selectedCompany"
            :value="props.companies"
            dataKey="id"
            :filters="filters"
            scrollable
            scrollHeight="500px"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <div class="flex flex-row gap-4">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Rechercher..." />
                        </IconField>
                        <Select
                            :modelValue="filters['status'].value"
                            @update:modelValue="updateStatusFilter"
                            :options="statuses"
                            showClear
                            optionLabel="name"
                            placeholder="Filtrer par..."
                            class="w-full md:w-56"
                          >
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
                    <div>
                        <Button 
                            label="Nouveau" 
                            v-tooltip.top="{ value: 'Ajouter entreprise'}" 
                            icon="pi pi-plus"
                            severity="contrast"
                            class="mr-2"
                            @click="openNew"
                        />
                        <Button
                            label="Supprimer"
                            v-tooltip.top="!selectedCompany || !selectedCompany.length ? null : { value: 'Supprimer entreprise(s)'}"
                            icon="pi pi-trash"
                            severity="danger"
                            @click="confirmDeleteSelected"
                            :disabled="!selectedCompany || !selectedCompany.length"
                        />
                    </div>
                </div>
            </template>
            <template #empty>Aucune entreprise pour le moment.</template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Nom" sortable></Column>
            <Column field="address" header="Adresse">
                
            </Column>
            <Column field="siren" header="Siren">
                <template #body="{ data }">
                    <div class="flex flex-row justify-between items-center">
                        <p>{{ data.siren }}</p>
                        <Button class="!text-black" icon="pi pi-copy" text @click="copyItem(data.siren)" />
                    </div>
                </template>
            </Column>
            <Column field="siret" header="Siret">
                <template #body="{ data }">
                    <div class="flex flex-row justify-between items-center">
                        <p>{{ data.siret }}</p>
                        <Button class="!text-black" icon="pi pi-copy" text @click="copyItem(data.siret)" />
                    </div>
                </template>
            </Column>
            <Column field="tvaNumber" header="Numéro TVA">
                <template #body="{ data }">
                    <div class="flex flex-row justify-between items-center">
                        <p>{{ data.tvaNumber }}</p>
                        <Button class="!text-black" icon="pi pi-copy" text @click="copyItem(data.tvaNumber)" />
                    </div>
                </template>
            </Column>
            <Column header="Status" field="status" :filterMenuStyle="{ width: '14rem' }">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
            </Column>
        </DataTable>
        <div v-else>
            <div v-for="n in 4" :key="n" class="p-4">
                <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                <Skeleton width="75%" height="2rem" class="mb-2"></Skeleton>
                <Skeleton width="50%" height="2rem" class="mb-2"></Skeleton>
            </div>
        </div>
    </div>
</template>