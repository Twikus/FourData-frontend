<script setup lang="ts">
import { ref } from 'vue';
import MenuNav from '@/components/MenuNav.vue';

const props = defineProps<{
  title?: string
}>();

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<template>
    <div class="flex flex-row gap-4 flex-grow p-6">
      <div class="w-3/12 hidden lg:block">
        <Card class="h-full overflow-y-auto max-h-[calc(100vh-10rem)]">
          <template #content>
            <MenuNav />
          </template>
        </Card>
      </div>
      <div class="w-full lg:w-9/12">
        <Card class="h-full overflow-y-auto max-h-[calc(100vh-10rem)]">
          <template #content>
            <div class="flex flex-row">
              <Button @click="toggleMobileMenu" class="!text-black lg:!hidden" text>
                <i class="pi pi-bars text-2xl"></i>
              </Button>
              <h2 class="text-2xl font-bold leading-7 text-gray-900 m-6 sm:truncate sm:text-3xl sm:tracking-tight">{{ props.title }}</h2>
            </div>
            <slot />
          </template>
        </Card>
      </div>
    </div>
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="toggleMobileMenu"></div>
    <transition name="slide">
      <div class="fixed inset-y-0 left-0 bg-white w-64 p-4 z-50 transform transition-transform duration-300 lg:hidden" :class="{'-translate-x-full': !isMobileMenuOpen, 'translate-x-0': isMobileMenuOpen}">
        <Button @click="toggleMobileMenu" class="mb-4 !text-black" text>
          <i class="pi pi-times text-2xl"></i>
        </Button>
        <MenuNav />
      </div>
    </transition>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to, .slide-leave {
  transform: translateX(0);
}
</style>