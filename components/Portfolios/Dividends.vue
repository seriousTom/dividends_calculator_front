<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>
            Date
            <CommonSortingLinks :activeField="filters.order_by" :order="filters.order" fieldToSort="date" @sorted="sorted" />
          </th>
          <th>
            Company
            <CommonSortingLinks :activeField="filters.order_by" :order="filters.order" fieldToSort="company_name" @sorted="sorted" />
          </th>
          <th>
            Amount
            <CommonSortingLinks :activeField="filters.order_by" :order="filters.order" fieldToSort="amount" @sorted="sorted" />
          </th>
          <th>
            Taxes amount
            <CommonSortingLinks :activeField="filters.order_by" :order="filters.order" fieldToSort="taxes_amount" @sorted="sorted" />
          </th>
          <th>
            Amount after taxes
            <CommonSortingLinks :activeField="filters.order_by" :order="filters.order" fieldToSort="amount_after_taxes" @sorted="sorted" />
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="dividendsLoading">
          <td colspan="5" class="text-center">Loading...</td>
        </tr>
        <tr v-else v-for="(dividend, di) in dividends" :key="'dividends' + dividend.id">
          <td>{{ dividend.date }}</td>
          <td>{{ dividend.company.name }}</td>
          <td>{{ dividend.amount }} {{ dividend.currency.symbol }}</td>
          <td>{{ dividend.taxes_amount }} {{ dividend.currency.symbol }}</td>
          <td>{{ dividend.amount_after_taxes }} {{ dividend.currency.symbol }}</td>
          <td>
            <template v-if="!dividend.loading">
              <a href="" class="me-2" @click.prevent="showEditDividendFormClick(dividend)"><font-awesome-icon icon="fa-solid fa-pen" /></a>
              <a href="" class="text-danger" @click.prevent="deleteDividend(di)"><font-awesome-icon icon="fa-solid fa-trash-can" /></a>
            </template>
            <template v-else>
              Loading...
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <CommonPagesLinks
        @pageChanged="pageChanged"
        v-if="paginationData.last_page > 1"
        :current-page="paginationData.current_page"
        :total-pages="paginationData.last_page" />
  </div>
  <CommonModal modal-title="Edit dividend" :show-modal="showEditDividendForm" @close-modal="showEditDividendForm = !showEditDividendForm">
    <PortfoliosDividendEditForm @dividendEdited="dividendEdited" :portfolios="portfolios" :portfolio="portfolio" :dividend="dividendBeingEdited"/>
  </CommonModal>
</template>
<script setup>
import useApiFetch from "../../composables/useApiFetch";
import useChangeUrlParameter from "../../composables/useChangeUrlParameter";

const props = defineProps({
  portfolio: {
    type: Object,
    required: false,
  },
  portfolios: {
    type: Array,
    required: true
  }
});

const route = useRoute();
const router = useRouter();
const currentPage = route.query.page ?? null;

const filters = ref(route.query);

// const filters = ref({
//   order_by: null,
//   order: null
// });

const dividendsLoading = ref(false);
const dividends = ref([]);
const paginationData = ref({});

const dividendBeingEdited = ref({});
const showEditDividendForm = ref(false);

const fetchDividends = (params) => {
  dividendsLoading.value = true;

  const queryString = objectToQueryString(params);

  useApiFetch('/dividends' + (props.portfolio ? '/' + props.portfolio.id : '') + '?' + queryString).then((data) => {
    dividends.value = data.data.map((value) => {
      value.loading = false;
      return value;
    });
    paginationData.value = data.meta;
    dividendsLoading.value = false;
  });
};

const sorted = (field, order) => {
  filters.value = {
    order_by: field,
    order: order
  };
  // filters.value.order_by = field;
  // filters.value.order = order;

  router.push({
    query: filters.value,
  })

  fetchDividends(filters.value);
}

//todo: move to composable
const objectToQueryString = (obj) => {
  return Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
}

const showEditDividendFormClick = (dividend) => {
  dividendBeingEdited.value = dividend;
  showEditDividendForm.value = true;
}

const dividendEdited = (dividend) => {
  const index = dividends.value.findIndex((d) => {
    return d.id == dividend.id;
  });

  dividends.value[index] = dividend;

  showEditDividendForm.value = false;
}

const deleteDividend = async (index) => {
  if(!window.confirm('Do you really wish to delete dividend?')) {
    return;
  }

  dividends.value[index].loading = true;

  try {
    await useApiFetch('/dividends/' + dividends.value[index].id + '/delete', {method: 'DELETE'});
    dividends.value.splice(index, 1);
    useNuxtApp().$toast.success('Dividend deleted');
  } catch(e) {
    useNuxtApp().$toast.error('Something wrong happened. Try again');
  }
  dividends.value[index].loading = false;
}

const {changeUrlParameters} = useChangeUrlParameter();

const pageChanged = async (page) => {
  changeUrlParameters('page', page);

  filters.value.page = page;

  fetchDividends(filters.value);
};

fetchDividends(filters.value);

defineExpose({fetchDividends});
</script>
