<script setup lang="ts">
import { onMounted, watch } from 'vue';

import Layout from '@/components/Layout.vue';
import MyDataTable from '@/components/MyDataTable.vue';
import { useCompanyStore } from '@/stores/company';
import { displayError } from '@/helpers';

const companyStore = useCompanyStore();

onMounted(async () => {
    try {
        await companyStore.fetchCompanies();
    } catch (error) {
        displayError(error);
    }
});
</script>

<template>
    <Layout title="Mes entreprises">
        <MyDataTable :companies="companyStore.companies" />
    </Layout>
</template>