<template>
  <section>
    <div class="container py-5">
      <div class="card">
        <div class="card-header">
          <PortfoliosNavigation :main-page="'statistics'" :portfolios="portfolios"/>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label for="year">Year:</label>
                <select id="year" class="form-control" v-model="selectedYear"
                        @change="getStatistic(selectedPortfolioId, selectedYear)">
                  <option v-for="year in years" :value="year">{{ year }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div>
                <StatisticMonthlyChart :monthlyStatisticData="statistic.monthly_dividends ? statistic.monthly_dividends : []"/>
<!--                <canvas ref="monthlyDividendsCanvas"></canvas>-->
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Chart from 'chart.js/auto'
import flatPickr from 'vue-flatpickr-component';

definePageMeta({
  middleware: ["auth"]
});

onMounted(() => {
  getStatistic(selectedPortfolioId, selectedYear.value);
});

const route = useRoute();
const selectedPortfolioId = route.params.id ?? null;

const years = ref([]);
const selectedYear = ref(null);

const portfolios = ref([]);
const portfoliosInit = await useApiFetch('/portfolios?portfolio_id=' + selectedPortfolioId);
portfolios.value = portfoliosInit.data;

const selectedPortfolio = portfolios.value.find(portfolio => selectedPortfolioId == portfolio.id);

const statisticLoading = ref(true);
const statistic = ref({});

const getStatistic = async (portfolioId, year) => {

  statisticLoading.value = true;
  statistic.value = await useApiFetch('/statistic?portfolio_id=' + (portfolioId ?? '') + '&year=' + (year ?? ''));
  statisticLoading.value = false;
  years.value = getYearsArray(statistic.value.oldest_year);
};

const getYearsArray = (oldestYear) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = [];

  if (currentYear <= oldestYear) {
    years.push(currentYear);
    return years;
  }

  for (let i = oldestYear; i <= currentYear; i++) {
    years.push(i);
  }

  return years;
};
</script>
