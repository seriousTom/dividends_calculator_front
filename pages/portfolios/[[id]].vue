<template>
  <section>
    <div class="container py-5">
      <div class="mb-3">
        <button @click="showAddDividendsForm = !showAddDividendsForm" type="button" class="btn btn-primary">Add dividends</button>
      </div>
      <div class="card">
        <div class="card-header">
          <PortfoliosNavigation :portfolios="portfolios"/>
        </div>
        <div class="card-body">
          <PortfoliosDividends ref="dividendsTable" :portfolios="portfolios" :portfolio="selectedPortfolio"/>
        </div>
      </div>
    </div>
  </section>
  <CommonModal modal-title="Add dividends" v-if="showAddDividendsForm" :show-modal="showAddDividendsForm" @close-modal="showAddDividendsForm = !showAddDividendsForm">
    <PortfoliosDividendsForm @dividendsCreated="dividendsCreated" @portfolioCreated="portfolioCreated" :portfolios="portfolios" :selected-portfolio="selectedPortfolio"/>
  </CommonModal>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});

//reference to DividendsTable component
const dividendsTable = ref();

const route = useRoute();
const selectedPortfolioId = route.params.id ?? null;

const showAddDividendsForm = ref(false);

const portfolios = ref([]);

const portfoliosInit = await useApiFetch('/portfolios?portfolio_id=' + selectedPortfolioId);
portfolios.value = portfoliosInit.data;

const selectedPortfolio = portfolios.value.find(portfolio => selectedPortfolioId == portfolio.id);

const portfolioCreated = (newPortfolios) => {
  portfolios.value = newPortfolios;
}

const dividendsCreated = () => {
  //call method existing in DividendsTable component
  dividendsTable.value.fetchDividends({page: 1});
  showAddDividendsForm.value = false;
}

</script>
