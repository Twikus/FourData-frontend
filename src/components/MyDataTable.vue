<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { getSeverity, displayError } from '@/helpers';

import { useCompanyStore } from '@/stores/company';

import CopyButton from '@/components/Buttons/CopyButton.vue';
import DataTableToolbar from '@/components/Toolbars/DataTableToolbar.vue';

import CreateCompanyDialog from './Dialogs/CreateCompanyDialog.vue';
import EditCompanyDialog from './Dialogs/EditCompanyDialog.vue';
import DeleteCompanyDialog from '@/components/Dialogs/DeleteCompanyDialog.vue';

import type { Company } from '@/interfaces/company';

const props = defineProps<{
    companies?: Company[],
    filters?: any
}>();

const companyStore = useCompanyStore();

const selectedCompanies = ref<Company[]>([]);
const createCompanyDialog = ref(false);
const editCompanyDialog = ref(false);
const deleteCompanyDialog = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const statusOptions = [
    { name: 'Ouverte' },
    { name: 'Fermée' },
];

function openCreate() {
    createCompanyDialog.value = true;
};

function openEdit() {
    editCompanyDialog.value = true;
};

function openDelete() {
    deleteCompanyDialog.value = true;
};

function updateFilters(newFilters: any) {
    filters.value = newFilters;
};

function deleteCompanies(ids: number[]) {
    ids.forEach(id => companyStore.deleteCompany(id));
}

async function saveCompany({ identifierType, identifierValue }: { identifierType: string, identifierValue: number }) {
    try {
        if (identifierType === 'siren') {
            await companyStore.createCompany(identifierValue, undefined);
        } else {
            await companyStore.createCompany(undefined, identifierValue);
        }
        createCompanyDialog.value = false;
        selectedCompanies.value = [];
    } catch (error) {
        displayError(error);
    }
}

async function editCompany(company: Company) {
    try {
        await companyStore.updateCompany(company);
        editCompanyDialog.value = false;
        selectedCompanies.value = [];
    } catch (error) {
        displayError(error);
    }
}
</script>

<template>
    <div>
        <DataTableToolbar :filters="filters" :status-options="statusOptions" :selectedCompanies="selectedCompanies"
            @update:filters="updateFilters" @open-create="openCreate" @open-delete="openDelete" @open-edit="openEdit" />

        <DataTable v-if="props.companies" v-model:selection="selectedCompanies" :value="props.companies" stripedRows
            dataKey="id" :filters="filters" scrollable scrollHeight="500px">

            <template #empty>Aucune entreprise pour le moment...</template>

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Nom" sortable></Column>
            <Column field="address" header="Adresse"></Column>
            <Column field="siren" header="Siren">
                <template #body="{ data }">
                    <div class="flex flex-row justify-between items-center">
                        <p>{{ data.siren }}</p>
                        <CopyButton :value="data.siren" />
                    </div>
                </template>
            </Column>
            <Column field="siret" header="Siret">
                <template #body="{ data }">
                    <div class="flex flex-row justify-between items-center">
                        <p>{{ data.siret }}</p>
                        <CopyButton :value="data.siret" />
                    </div>
                </template>
            </Column>
            <Column field="tvaNumber" header="Numéro TVA">
                <template #body="{ data }">
                    <div class="flex flex-row justify-between items-center">
                        <p>{{ data.tvaNumber }}</p>
                        <CopyButton :value="data.tvaNumber" />
                    </div>
                </template>
            </Column>
            <Column header="Status" field="status" :filterMenuStyle="{ width: '14rem' }">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
            </Column>
        </DataTable>

        <EditCompanyDialog :visible="editCompanyDialog" :selectedCompany="selectedCompanies[0]"
            @update:visible="editCompanyDialog = $event" @update="editCompany" />
        <CreateCompanyDialog :visible="createCompanyDialog" @update:visible="createCompanyDialog = $event"
            @save="saveCompany" />
        <DeleteCompanyDialog :visible="deleteCompanyDialog" :selectedCompanies="selectedCompanies"
            @update:visible="deleteCompanyDialog = $event" @delete="deleteCompanies" />
    </div>
</template>