<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToLogin() {
  router.push('/login');
}
</script>

<template>
  <div class="flex flex-col">
    <div class="text-center pt-32 pb-16">
      <h1 class="text-4xl font-bold mb-4">Gérez facilement vos entreprises avec CompanySaver</h1>
      <p class="text-lg mb-6">Ajoutez des entreprises à votre compte en un clic en renseignant simplement le SIREN ou le SIRET.</p>
      <Button label="Commencez maintenant" @click="goToLogin" />
    </div>

    <section class="py-16">
      <h2 class="text-3xl font-semibold text-center mb-8">Comment ça marche ?</h2>
      <div class="feature-cards container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card class="card">
          <template #title>
            <h3 class="text-xl font-semibold mb-2">Entrez le SIREN/SIRET ✍️</h3>
          </template>
          <template #content>
            <p>Renseignez simplement le SIREN ou le SIRET de l'entreprise.</p>
          </template>
        </Card>
        <Card class="card">
          <template #title>
            <h3 class="text-xl font-semibold mb-2">Auto-Remplissage ⏳</h3>
          </template>
          <template #content>
            <p>Les informations de l'entreprise sont automatiquement récupérées et ajoutées à votre compte.</p>
          </template>
        </Card>
        <Card class="card">
          <template #title>
            <h3 class="text-xl font-semibold mb-2">Gérez votre liste ✅</h3>
          </template>
          <template #content>
            <p>Accédez facilement à toutes vos entreprises depuis votre tableau de bord.</p>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}
</style>