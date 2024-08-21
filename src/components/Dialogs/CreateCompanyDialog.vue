<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    visible: Boolean,
});

const emit = defineEmits(['update:visible', 'save', 'error']);

const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value),
});

const selectedIdentifierType = ref('siren');
const identifierValue = ref<number | null>(null);
const submitted = ref(false);
const error = ref<string | null>(null);

function resetData() {
    selectedIdentifierType.value = 'siren';
    identifierValue.value = null;
}

function closeDialog() {
    dialogVisible.value = false;
    resetData();
};

function validateIdentifier() {
    if (selectedIdentifierType.value === 'siren' && identifierValue.value !== null && identifierValue.value.toString().length !== 9) {
        return 'Le SIREN doit contenir exactement 9 chiffres.';
    }
    if (selectedIdentifierType.value === 'siret' && identifierValue.value !== null && identifierValue.value.toString().length !== 14) {
        return 'Le SIRET doit contenir exactement 14 chiffres.';
    }
    return null;
}

function saveCompany() {
    submitted.value = true;

    const validationError = validateIdentifier();
    if (validationError) {
        error.value = validationError;
        return;
    }

    emit('save', { identifierType: selectedIdentifierType.value, identifierValue: identifierValue.value });
    closeDialog();
}

</script>

<template>
    <Dialog v-model:visible="dialogVisible" :style="{ width: '450px' }" header="Ajouter une entreprise" :modal="true">
        <div class="flex flex-col gap-6">
            <div class="form-group flex flex-col">
                <label for="identifierType">Type d'identifiant</label>
                <Select id="identifierType" v-model="selectedIdentifierType"
                    :options="[{ label: 'SIREN', value: 'siren' }, { label: 'SIRET', value: 'siret' }]"
                    optionLabel="label" optionValue="value" placeholder="Sélectionnez un type" />
            </div>
            <div class="form-group">
                <label for="identifierValue">Valeur</label>
                <InputNumber id="identifierValue" v-model="identifierValue" required :useGrouping="false"
                    :invalid="submitted && !identifierValue" fluid
                    :placeholder="selectedIdentifierType === 'siren' ? 'ex: 123456789' : 'ex: 12345678900012'" />
            </div>
            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        </div>
        <template #footer>
            <Button label="Annuler" icon="pi pi-times" text @click="closeDialog" />
            <Button label="Créer" icon="pi pi-check" @click="saveCompany" />
        </template>
    </Dialog>
</template>