<script setup lang="ts">
import navigation from '@/navigation';
</script>

<template>
    <div>
        <Menu :model="navigation">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
        </Menu>
    </div>
</template>