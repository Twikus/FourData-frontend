<script setup lang="ts">
import { defineProps, defineEmits, reactive, watch, computed, ref } from "vue";
import { getSeverity } from "@/helpers";

const props = defineProps<{
    visible: boolean;
    selectedCompany: any;
}>();

const emit = defineEmits(["update:visible", "update"]);

const error = ref<string | null>(null);

const data = reactive({
    id: 0,
    name: "",
    address: "",
    siren: 0,
    siret: 0,
    tva_number: "",
    status: "",
});

const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value),
});

const statuses = [
    { name: 'Ouverte' },
    { name: 'Fermée' },
];

watch(() => props.selectedCompany, (newCompany) => {
    if (newCompany) {
        data.id = newCompany.id;
        data.name = newCompany.name;
        data.address = newCompany.address;
        data.siren = newCompany.siren;
        data.siret = newCompany.siret;
        data.tva_number = newCompany.tvaNumber;
        data.status = newCompany.status;
    }
}, { immediate: true });

function resetData() {
    data.id = 0;
    data.name = "";
    data.address = "";
    data.siren = 0;
    data.siret = 0;
    data.tva_number = "";
    data.status = "";
}

function validateForm() {
    switch (true) {
        case !data.name || !data.address || !data.siren || !data.siret || !data.tva_number || !data.status:
            return 'Veuillez remplir tous les champs.';
        case data.siren.toString().length !== 9:
            return 'Le SIREN doit contenir exactement 9 chiffres.';
        case data.siret.toString().length !== 14:
            return 'Le SIRET doit contenir exactement 14 chiffres.';
        default:
            return;
    }
}

function closeDialog() {
    dialogVisible.value = false;
    resetData();
}

function updateCompany() {
    const validationError = validateForm();
    if (validationError) {
        error.value = validationError;
        return;
    }

    emit("update", data);
    resetData();
}
</script>

<template>
    <Dialog v-model:visible="dialogVisible" :style="{ width: '450px' }" header="Éditer une entreprise" :modal="true">
        <div class="flex flex-col gap-6">
            <div class="form-group flex flex-col">
                <label for="name">Nom<span class="text-red-600">*</span></label>
                <InputText id="name" v-model="data.name" />
            </div>
            <div class="form-group flex flex-col">
                <label for="address">Adresse<span class="text-red-600">*</span></label>
                <InputText id="address" v-model="data.address" />
            </div>
            <div class="form-group flex flex-col">
                <label for="siren">SIREN<span class="text-red-600">*</span></label>
                <InputNumber id="siren" v-model="data.siren" :useGrouping="false" />
            </div>
            <div class="form-group flex flex-col">
                <label for="siret">SIRET<span class="text-red-600">*</span></label>
                <InputNumber id="siret" v-model="data.siret" :useGrouping="false" />
            </div>
            <div class="form-group flex flex-col">
                <label for="tvaNumber">Numéro de TVA<span class="text-red-600">*</span></label>
                <InputText id="tvaNumber" v-model="data.tva_number" />
            </div>
            <div class="form-group flex flex-col">
                <label for="status">Status<span class="text-red-600">*</span></label>
                <Select :options="statuses" v-model="data.status" optionLabel="name" optionValue="name"
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
            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        </div>

        <template #footer>
            <Button label="Annuler" icon="pi pi-times" text @click="closeDialog" />
            <Button label="Mettre à jour" icon="pi pi-check" @click="updateCompany" />
        </template>
    </Dialog>
</template>
