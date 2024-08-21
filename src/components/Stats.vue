<template>
  <div class="flex flex-col h-full w-full gap-4 lg:flex-row">
    <div class="w-full lg:w-4/12">
      <Card class="shadow-2 p-3 rounded">
        <template #content>
          <div class="flex justify-between">
            <div>
              <span class="block text-500 font-medium mb-3">Total Entreprises</span>
              <div class="text-900 font-medium text-xl">0</div>
            </div>
            <div class="flex bg-blue-100 rounded-2xl justify-center items-center" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-building text-blue-500 text-xl"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="w-full lg:w-4/12">
      <Card class="shadow-2 p-3 rounded">
        <template #content>
          <div class="flex justify-between">
            <div>
              <span class="block text-500 font-medium mb-3">Entreprises Ouvertes</span>
              <div class="text-900 font-medium text-xl">0</div>
            </div>
            <div class="flex bg-green-100 rounded-2xl justify-center items-center" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-check-circle text-green-500 text-xl"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="w-full lg:w-4/12">
      <Card class="shadow-2 p-3 rounded">
        <template #content>
          <div class="flex justify-between">
            <div>
              <span class="block text-500 font-medium mb-3">Entreprises Fermées</span>
              <div class="text-900 font-medium text-xl">0</div>
            </div>
            <div class="flex bg-red-100 rounded-2xl justify-center items-center" style="width:2.5rem;height:2.5rem;">
              <i class="pi pi-times-circle text-red-500 text-xl"></i>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>