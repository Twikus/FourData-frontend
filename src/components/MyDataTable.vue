<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { Company } from '@/interfaces/company';

const props = defineProps<{
    companies?: Company[],
    filters?: any
}>();

const selectedCompany = ref<Company[]>([]);
</script>

<template>
    <div>
        <DataTable
            v-if="props.companies && props.companies.length > 0"
            v-model:selection="selectedCompany"
            :value="props.companies"
            dataKey="id"
            :filters="props?.filters"
        >
            <Column field="name" header="Nom" sortable></Column>
            <Column field="address" header="Adresse" sortable></Column>
            <Column field="siren" header="Siren" sortable></Column>
            <Column field="siret" header="Siret" sortable></Column>
            <Column field="tvaNumber" header="Numéro TVA" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
        </DataTable>
    </div>
</template>