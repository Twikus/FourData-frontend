<script setup lang="ts">
import { copyItem } from '@/helpers';

const props = defineProps<{
    value: any;
}>();
</script>

<template>
    <Button class="!text-black" icon="pi pi-copy" text @click="copyItem(props.value)" />
</template>