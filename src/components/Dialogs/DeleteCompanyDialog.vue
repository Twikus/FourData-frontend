<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

import type { Company } from '@/interfaces/company';

const props = defineProps({
  visible: Boolean,
  selectedCompanies: Array as () => Company[],
});

const emit = defineEmits(['update:visible', 'delete']);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});

const closeDialog = () => {
  dialogVisible.value = false;
};

const confirmDelete = () => {
  const ids = props.selectedCompanies?.map(company => company.id) || [];
  emit('delete', ids);
  closeDialog();
};
</script>

<template>
  <Dialog v-model:visible="dialogVisible" :style="{ width: '450px' }" header="Confirmer" :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="props.selectedCompanies?.length === 1">
        Êtes-vous sûr de vouloir supprimer <b>{{ props.selectedCompanies[0].name }}</b> ?
      </span>
      <span v-else>
        Êtes-vous sûr de vouloir supprimer les entreprises sélectionnées ?
      </span>
    </div>
    <template #footer>
      <Button label="Non" icon="pi pi-times" text @click="closeDialog" />
      <Button label="Oui" icon="pi pi-check" @click="confirmDelete" />
    </template>
  </Dialog>
</template>