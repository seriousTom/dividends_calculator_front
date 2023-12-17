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
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-3">
          <div class="card ">
            <div class="card-body">
              <div class="text-center fs-5 fw-bold">All time dividends received</div>
              <div class="text-center fs-2 fw-bold mt-2">{{ statistic.all_time_total_dividends_received }} $</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card ">
            <div class="card-body">
              <div class="text-center fs-5 fw-bold">Total dividends received in {{ statistic.year }}</div>
              <div class="text-center fs-2 fw-bold mt-2">{{ statistic.total_dividends_received_in_year }} $</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card ">
            <div class="card-body">
              <template v-if="statistic.all_time_most_dividends_received_from_company">
                <div class="text-center fs-5 fw-bold">All time most dividends received from company</div>
                <div class="text-center fs-3 text-secondary mt-2"><strong>{{ statistic.all_time_most_dividends_received_from_company.name }}</strong></div>
                <div class="text-center fs-2 fw-bold mt-2">{{ statistic.all_time_most_dividends_received_from_company.dividends_sum }} $</div>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card ">
            <div class="card-body">
              <template v-if="statistic.all_time_most_dividends_received_from_company">
                <div class="text-center fs-5 fw-bold">In {{ statistic.year }} most dividends received from</div>
                <div class="text-center fs-3 text-secondary mt-2"><strong>{{ statistic.most_dividends_received_from_company_in_year.name }}</strong></div>
                <div class="text-center fs-2 fw-bold mt-2">{{ statistic.most_dividends_received_from_company_in_year.dividends_sum }} $</div>
              </template>
            </div>
          </div>
        </div>
      </div>


      <div class="card mt-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div>
                <StatisticDividendsAmountChart :chart-title="'Dividends received per month'" :period-statistic-data="statistic.monthly_dividends ? statistic.monthly_dividends : []"/>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <StatisticDividendsAmountChart :chart-title="'Dividends received per quarter'" :period-statistic-data="statistic.quarter_dividends ? statistic.quarter_dividends : []"/>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>
<script setup>
import flatPickr from 'vue-flatpickr-component';

definePageMeta({
  middleware: ["auth"]
});

onMounted(() => {
  getStatistic(selectedPortfolioId, selectedYear.value);
});

const route = useRoute();
const router = useRouter();

const selectedPortfolioId = route.params.id ?? null;

const years = ref([]);
const selectedYear = ref(route.query.year ?? null);

const portfolios = ref([]);
const portfoliosInit = await useApiFetch('/portfolios?portfolio_id=' + selectedPortfolioId);
portfolios.value = portfoliosInit.data;

const selectedPortfolio = portfolios.value.find(portfolio => selectedPortfolioId == portfolio.id);

const statisticLoading = ref(true);
const statistic = ref({});

const getStatistic = async (portfolioId, year) => {
  router.push({
    path: '/statistics/' + portfolioId,
    query: { year: year },
  })
  statisticLoading.value = true;
  statistic.value = await useApiFetch('/statistic?portfolio_id=' + (portfolioId ?? '') + '&year=' + (year ?? ''));
  statisticLoading.value = false;
  selectedYear.value = statistic.value.year;
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
