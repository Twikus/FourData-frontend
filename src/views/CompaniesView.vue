<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Layout from '@/components/Layout.vue';
import MyDataTable from '@/components/MyDataTable.vue';
import { useCompanyStore } from '@/stores/company';
import { displayError } from '@/helpers';

const companyStore = useCompanyStore();

const processing = ref(false);

onMounted(async () => {
    try {
        processing.value = true;
        await companyStore.fetchCompanies();
        processing.value = false;
    } catch (error) {
        displayError(error);
    }
});
</script>

<template>
    <div class="w-full">
        <Layout title="Mes entreprises">
            <div v-if="processing">
                <div v-for="n in 4" :key="n" class="p-4">
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="75%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="50%" height="2rem" class="mb-2"></Skeleton>
                </div>
            </div>
            <MyDataTable v-else :companies="companyStore.companies" />
        </Layout>
    </div>
</template>