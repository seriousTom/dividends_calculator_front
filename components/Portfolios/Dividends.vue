<template>
  <div>
    <form class="my-3">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label>Company</label>
<!--            <vSelect @option:selected="companyChanged" v-model="selectedCompany" :options="companiesOptions" @search="searchCompanies">-->
<!--            </vSelect>-->
            <vSelect @option:selected="companyChanged" v-model="selectedCompany" :options="companiesOptions">
              <!--              <template #selected-option="{ id, label, name }">-->
              <!--                {{ id }} - {{ label }}  - {{ name }}-->
              <!--              </template>-->
            </vSelect>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="date_from">Date from</label>
            <flat-pickr
                id="date_from"
                v-model="filters.date_from"
                :config="datePickerConfig"
                class="form-control"
                name="date_to"
                autocomplete="off">
            </flat-pickr>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="date_to">Date to</label>
            <flat-pickr
                id="date_to"
                v-model="filters.date_to"
                class="form-control"
                name="date_to"
                autocomplete="off">
            </flat-pickr>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <button type="button" class="btn btn-primary" @click="filter">Filter</button>
      </div>
    </form>
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
  <CommonModal modal-title="Edit dividend" v-if="showEditDividendForm" :show-modal="showEditDividendForm" @close-modal="showEditDividendForm = !showEditDividendForm">
    <PortfoliosDividendEditForm @dividendEdited="dividendEdited" :portfolios="portfolios" :portfolio="portfolio" :dividend="dividendBeingEdited"/>
  </CommonModal>
</template>
<script setup>
import vSelect from "vue-select";
import useApiFetch from "../../composables/useApiFetch";
import FlatPickr from 'vue-flatpickr-component';
import useCompaniesSelect from "../../composables/useCompaniesSearch";

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
// const currentPage = route.query.page ?? null;

const {fetchCompanies, companiesOptions, searchCompanies} = useCompaniesSelect();

const selectedCompany = ref(null);

const companyChanged = (option) => {
  // filters.value.company_id = option.id;
};

companiesOptions.value = (await fetchCompanies('', route.query.company_id ?? ''));
companiesOptions.value.map((company) => {
  company.label = company.name + ', ' + company.ticker;
  return company;
});

if(companiesOptions.value.length) {
  selectedCompany.value = companiesOptions.value.find(company => company.id == route.query.company_id);
}

const filters = ref({
  company_id: route.query.company_id ?? null,
  date_from: route.query.date_from ?? null,
  date_to: route.query.date_to ?? null,
  order_by: route.query.order_by ?? null,
  order: route.query.order ?? null,
  page: route.query.page ?? null,
});

watch(selectedCompany, async () => {
  if(selectedCompany.value) {
    filters.value.company_id = selectedCompany.value.id;
  } else {
    filters.value.company_id = null;
  }
});

const dividendsLoading = ref(false);
const dividends = ref([]);
const paginationData = ref({});

const dividendBeingEdited = ref({});
const showEditDividendForm = ref(false);

const fetchDividends = (params) => {
  params = removeNullAndEmpty(params);

  //for some reason not all values are pushed to url from filters object, so it's put in useApiFetch callback
  // router.push({
  //   query: params
  // });

  dividendsLoading.value = true;

  const queryString = objectToQueryString(params);

  useApiFetch('/dividends' + (props.portfolio ? '/' + props.portfolio.id : '') + '?' + queryString).then((data) => {
    dividends.value = data.data.map((value) => {
      value.loading = false;
      return value;
    });
    paginationData.value = data.meta;
    dividendsLoading.value = false;

    router.push({
      query: params
    });
  });
};

const sorted = (field, order) => {

  filters.value.order_by = field;
  filters.value.order = order;

  fetchDividends(filters.value);
}

const filter = () => {
  filters.value.page = 1;
  fetchDividends(filters.value);
}

//todo: move to composable
const objectToQueryString = (obj) => {
  return Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
}

//todo: move to composable
const removeNullAndEmpty = (originalObj) => {
  const newObj = {};

  for (const key in originalObj) {
    if (originalObj[key] !== null && originalObj[key] !== '') {
      newObj[key] = originalObj[key];
    }
  }

  return newObj;
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

const pageChanged = (page) => {
  filters.value.page = page;

  fetchDividends(filters.value);
};

fetchDividends(filters.value);

defineExpose({fetchDividends});
</script>
