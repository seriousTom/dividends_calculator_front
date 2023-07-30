<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th>Amount</th>
          <th>Taxes amount</th>
          <th>Amount after taxes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="dividendsLoading">
          <td colspan="5" class="text-center">Loading...</td>
        </tr>
        <tr v-else v-for="dividend in dividends" :key="'dividends' + dividend.id">
          <td>{{ dividend.date }}</td>
          <td>{{ dividend.company.name }}</td>
          <td>{{ dividend.amount }} {{ dividend.currency.symbol }}</td>
          <td>{{ dividend.taxes_amount }} {{ dividend.currency.symbol }}</td>
          <td>{{ dividend.amount_after_taxes }} {{ dividend.currency.symbol }}</td>
        </tr>
      </tbody>
    </table>
    <CommonPagesLinks
        @pageChanged="pageChanged"
        v-if="paginationData.last_page > 1"
        :current-page="paginationData.current_page"
        :total-pages="paginationData.last_page" />
  </div>
</template>
<script setup>
const props = defineProps({
  portfolio: {
    type: Object,
    required: false,
  }
});

const route = useRoute();
const currentPage = route.query.page ?? null;

const dividendsLoading = ref(false);
const dividends = ref([]);
const paginationData = ref({});

const fetchDividends = (currentPage) => {
  dividendsLoading.value = true;
  useApiFetch('/dividends' + (props.portfolio ? '/' + props.portfolio.id : '') + (currentPage ? '?page=' + currentPage : '')).then((data) => {
    dividends.value = data.data;
    paginationData.value = data.meta;
    dividendsLoading.value = false;
  });
};

const pageChanged = async (page) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set('page', page);

  const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
  window.history.replaceState({}, document.title, newUrl);

  fetchDividends(page);
};

fetchDividends(currentPage);
</script>
