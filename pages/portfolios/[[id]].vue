<template>
  <section>
    <div class="card text-center">
      <div class="card-header">
        <PortfoliosNavigation :portfolios="portfolios"/>
      </div>
      <div class="card-body">
        <PortfoliosDividends :portfolio="selectedPortfolio"/>
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});

const route = useRoute();
const selectedPortfolioId = route.params.id ?? null;

useApiFetch('/portfolios?portfolio_id=' + selectedPortfolioId);
const {data: portfolios} = await useApiFetch('/portfolios?portfolio_id=' + selectedPortfolioId);

const selectedPortfolio = portfolios.find(portfolio => selectedPortfolioId == portfolio.id);

</script>
