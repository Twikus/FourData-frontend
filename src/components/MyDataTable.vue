<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { copyItem, getSeverity, displayError } from '@/helpers';

import { useCompanyStore } from '@/stores/company';

import type { Company, Siren, Siret } from '@/interfaces/company';

const props = defineProps<{
    companies?: Company[],
    filters?: any
}>();

const companyStore = useCompanyStore();

const selectedCompany = ref<Company[]>([]);
const selectedIdentifierType = ref('siren');
const identifierValue = ref<number | null>(null);
const submitted = ref(false);
const companyDialog = ref(false);
const deleteCompanyDialog = ref(false);
const deleteCompaniesDialog = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const statuses = [
    { name: 'Ouverte' },
    { name: 'Fermée' },
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

function openNew() {
    company.value = {
        id: 0,
        name: '',
        address: '',
        siren: 0,
        siret: 0,
        tvaNumber: '',
        status: false,
    };

    selectedIdentifierType.value = 'siren';
    identifierValue.value = null;
    submitted.value = false;
    companyDialog.value = true;
};

function updateStatusFilter(value: any) {
    filters.value.status.value = value ? value.name : null;
}

function hideDialog() {
    companyDialog.value = false;
};

function confirmDeleteSelected() {
    if (selectedCompany.value.length > 1) {
        deleteCompaniesDialog.value = true;
    } else if (selectedCompany.value.length === 1) {
        company.value = selectedCompany.value[0];
        deleteCompanyDialog.value = true;
    }
};

function deleteCompanies() {
    selectedCompany.value.forEach(company => {
        deleteCompany(company.id);
    });
    selectedCompany.value = [];
    deleteCompaniesDialog.value = false;
};

async function deleteCompany(id: number) {
    try {
        await companyStore.deleteCompany(id);
    } catch (error) {
        displayError(error);
    }

    selectedCompany.value = selectedCompany.value.filter(c => c.id !== id);
    deleteCompanyDialog.value = false;
};

async function saveCompany() {
    submitted.value = true;
    if (identifierValue.value) {
        const companyData = ref<Siren | Siret>();

        if (selectedIdentifierType.value === 'siren') {
            companyData.value = { siren: identifierValue.value };
        } else {
            companyData.value = { siret: identifierValue.value };
        }

        try {
            await companyStore.createCompany(companyData.value);
        } catch (error) {
            displayError(error);
        }

        hideDialog();
    }
}
</script>

<template>
    <div>
        <DataTable v-if="props.companies && props.companies.length > 0" v-model:selection="selectedCompany"
            :value="props.companies" stripedRows dataKey="id" :filters="filters" scrollable scrollHeight="500px">
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <div class="flex flex-row gap-4">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Rechercher..." />
                        </IconField>
                        <Select :modelValue="filters['status'].value" @update:modelValue="updateStatusFilter"
                            :options="statuses" showClear optionLabel="name" placeholder="Filtrer par..."
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
                                    <Tag :value="slotProps.option.name"
                                        :severity="getSeverity(slotProps.option.name)" />
                                </div>
                            </template>
                        </Select>
                    </div>
                    <div>
                        <Button label="Nouveau" v-tooltip.top="{ value: 'Ajouter entreprise' }" icon="pi pi-plus"
                            severity="contrast" class="mr-2" @click="openNew" />
                        <Button label="Supprimer"
                            v-tooltip.top="!selectedCompany || !selectedCompany.length ? null : { value: 'Supprimer entreprise(s)' }"
                            icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                            :disabled="!selectedCompany || !selectedCompany.length" />
                    </div>
                </div>
            </template>
            <template #empty>Aucune entreprise pour le moment.</template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Nom" sortable></Column>
            <Column field="address" header="Adresse"></Column>
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
        <Dialog v-model:visible="companyDialog" :style="{ width: '450px' }" header="Ajouter une entreprise"
            :modal="true">
            <div class="flex flex-col gap-6">
                <div class="form-group flex flex-col">
                    <label for="identifierType">Type d'identifiant</label>
                    <Select id="identifierType" v-model="selectedIdentifierType"
                        :options="[{ label: 'SIREN', value: 'siren' }, { label: 'SIRET', value: 'siret' }]"
                        optionLabel="label" optionValue="value" placeholder="Sélectionnez un type" />
                </div>
                <div class="form-group">
                    <label for="identifierValue">Valeur</label>
                    <InputNumber id="identifierValue" v-model="identifierValue" required
                        :invalid="submitted && !identifierValue" fluid
                        :placeholder="selectedIdentifierType === 'siren' ? 'ex: 123456789' : 'ex: 12345678900012'" />
                </div>
            </div>

            <template #footer>
                <Button label="Annuler" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Créer" icon="pi pi-check" @click="saveCompany" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteCompanyDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="company">Êtes-vous sûr de vouloir supprimer <b>{{ company.name }}</b> ?</span>
            </div>
            <template #footer>
                <Button label="Non" icon="pi pi-times" text @click="deleteCompanyDialog = false" />
                <Button label="Oui" icon="pi pi-check" @click="deleteCompany(company.id)" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteCompaniesDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span>Êtes-vous sûr de vouloir supprimer les entreprises sélectionnées ?</span>
            </div>
            <template #footer>
                <Button label="Non" icon="pi pi-times" text @click="deleteCompaniesDialog = false" />
                <Button label="Oui" icon="pi pi-check" text @click="deleteCompanies" />
            </template>
        </Dialog>
    </div>
</template>