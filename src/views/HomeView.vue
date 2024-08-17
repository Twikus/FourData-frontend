<template>
  <main class="body-container">
    <div class="hero">
        <h1>Gérez facilement vos entreprises avec CompanySaver</h1>
        <p>Ajoutez des entreprises à votre compte en un clic en renseignant simplement le SIREN ou le SIRET.</p>
        <a href="/login" class="cta-button">Commencez maintenant</a>
    </div>

    <section class="features">
        <h2>Comment ça marche ?</h2>
        <div class="feature-cards">
            <div class="card">
                <h3>Entrez le SIREN/SIRET</h3>
                <p>Renseignez simplement le SIREN ou le SIRET de l'entreprise.</p>
            </div>
            <div class="card">
                <h3>Auto-Remplissage</h3>
                <p>Les informations de l'entreprise sont automatiquement récupérées et ajoutées à votre compte.</p>
            </div>
            <div class="card">
                <h3>Gérez votre liste</h3>
                <p>Accédez facilement à toutes vos entreprises depuis votre tableau de bord.</p>
            </div>
        </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>

.body-container {

  .hero {
    padding: 30px 15px;
    text-align: center;

    h1 {
      font-size: 24px;
      margin: 15px 0;
    }
    
    p {
      font-size: 16px;
      margin-bottom: 20px;
    }
 
    .cta-button {
      padding: 10px 20px;
      background-color: var(--color-primary);
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
  }
      
  .features {
      padding: 30px 15px;
      text-align: center;
    
    .feature-cards {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 30px;
    }
  }

  .card {
      background: #f4f4f4;
      padding: 20px;
      border-radius: 5px;
      width: 100%;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  @media(min-width: 768px) {
    .hero h1 {
      font-size: 36px;
    }

    .feature-cards {
      flex-direction: row !important;
      justify-content: center;
    }

    .card {
      width: 300px;
    }
  }
}
</style>
