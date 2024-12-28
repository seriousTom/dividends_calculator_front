<template>
  <form>
    <div class="mb-3">
      <label class="form-label">Porfolio</label>
      <select class="form-control" v-model="editedDividend.portfolio_id">
        <option v-for="portfolio in portfolios" :value="portfolio.id" :key="'portfolio-' + portfolio.id">{{ portfolio.name }}</option>
      </select>
      <div class="text-danger" v-html="getServerValidationError('portfolio_id')"></div>
    </div>
<!--    <div class="mb-3">-->
<!--        <label class="form-label">Company</label>-->
<!--        <vSelect v-model="editedDividend.company_id" :reduce="company => company.id" :options="companiesOptions" @search="searchCompanies" />-->
<!--        <div class="text-danger" v-html="getServerValidationError('company_id')"></div>-->
<!--    </div>-->
    <div class="mb-3">
      <label class="form-label">Company</label>
      <vSelect v-model="editedDividend.company_id" :reduce="company => company.id" :options="companiesOptions" />
      <div class="text-danger" v-html="getServerValidationError('company_id')"></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Amount</label>
        <input type="text" class="form-control" v-model="editedDividend.amount">
        <div class="text-danger" v-html="getServerValidationError('amount')"></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Taxes amount</label>
        <input type="text" class="form-control" v-model="editedDividend.taxes_amount">
        <div class="text-danger" v-html="getServerValidationError('taxes_amount')"></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Currency</label>
        <select class="form-control" v-model="editedDividend.currency_id">
          <option v-for="currency in currencies" :value="currency.id" :key="'currency-' + currency.id">{{ currency.name }}</option>
        </select>
        <div class="text-danger" v-html="getServerValidationError('currency_id')"></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Date</label>
        <flat-pickr class="form-control" v-model="editedDividend.date"/>
        <div v-html="getServerValidationError('date')"></div>
    </div>
    <div>
        <button type="button" class=" btn btn-primary w-100" @click="saveDividends" :disabled="loading">
          <template v-if="loading">Loading...</template>
          <template v-else>Submit</template>
        </button>
    </div>
  </form>
</template>
<script setup>
import flatPickr from 'vue-flatpickr-component';
import vSelect from "vue-select";
import useCompaniesSelect from "../../composables/useCompaniesSearch";
const {serverValidationErrors, refreshErrors, clearErrors, hasServerValidationError, getServerValidationError} = useHandleServerValidationErrors();

const props = defineProps({
  dividend: {
    type: Object,
    required: true
  },
  portfolio: {
    type: Object,
    required: true
  },
  portfolios: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['dividendEdited']);

const {fetchCompanies, companiesOptions, searchCompanies} = useCompaniesSelect();

const editedDividend = reactive({
  id: null,
  amount: null,
  taxes_amount: null,
  currency_id: null,
  company_id: null,
  portfolio_id: null,
  date: null
});

const selectedCompany = ref(null);

onMounted(async () => {
  companiesOptions.value = await fetchCompanies();
  // companiesOptions.value = await fetchCompanies(props.dividend.company.name);
  companiesOptions.value.map((company) => {
    company.label = company.name + ', ' + company.ticker;
    return company;
  });

  editedDividend.id = props.dividend.id;
  editedDividend.amount = props.dividend.amount;
  editedDividend.taxes_amount = props.dividend.taxes_amount;
  editedDividend.currency_id = props.dividend.currency.id;
  editedDividend.company_id = props.dividend.company.id;
  editedDividend.portfolio_id = props.dividend.portfolio_id;
  editedDividend.date = props.dividend.date;

  selectedCompany.value = companiesOptions.value.find((element) => {
    return element.id == editedDividend.company_id;
  });
});

// watch(() => props.dividend, async () => {
//   companiesOptions.value = await fetchCompanies(props.dividend.company.name);
//
//   editedDividend.id = props.dividend.id;
//   editedDividend.amount = props.dividend.amount;
//   editedDividend.taxes_amount = props.dividend.taxes_amount;
//   editedDividend.currency_id = props.dividend.currency.id;
//   editedDividend.company_id = props.dividend.company.id;
//   editedDividend.portfolio_id = props.dividend.portfolio_id;
//   editedDividend.date = props.dividend.date;
// });

const {data: currencies} = await useApiFetch('/currencies');

const loading = ref(false);

const saveDividends = async () => {
  loading.value = true;
  clearErrors();
  try {
    const {data} = await useApiFetch('/dividends/' + props.dividend.id + '/edit', {method: 'PUT', body: editedDividend});
    loading.value = false;

    emit('dividendEdited', data);
    useNuxtApp().$toast.success('Dividend edited.');
  } catch (error) {
    loading.value = false;
    refreshErrors(error);
    useNuxtApp().$toast.error('There are errors in the form.');
  }
};
</script>
