<template>
  <form>
    <FormSelect v-if="!newPortfolio" name="portfolio_id" label="Portfolio" :values="portfolios" v-model="selectedPortfolioId"></FormSelect>
    <FormCheckbox name="new_portfolio" v-model="newPortfolio" label="Create new portfolio"></FormCheckbox>
    <div v-if="newPortfolio">
      <hr>
      <h5>New Portfolio</h5>
      <PortfoliosPortfolioForm @portfolioCreated="portfolioCreated"></PortfoliosPortfolioForm>
      <hr>
    </div>
    <div v-if="!newPortfolio">
      <h5>Dividends</h5>
      <div v-for="(dividend, di) in dividends" :key="'dividends' + di">
        <div class="row">
          <div class="col-md-2">
            <label class="form-label">Company</label>
            <vSelect v-model="dividend.company_id" :reduce="company => company.id" :options="companiesOptions" @search="searchCompanies" />
          </div>
          <div class="col-md-2">
            <label class="form-label">Amount</label>
            <input type="text" class="form-control" v-model="dividend.amount">
          </div>
          <div class="col-md-2">
            <label class="form-label">Taxes amount</label>
            <input type="text" class="form-control" v-model="dividend.taxes_amount">
          </div>
          <div class="col-md-2">
            <label class="form-label">Currency</label>
            <select class="form-control" v-model="dividend.currency_id">
              <option v-for="currency in currencies" :value="currency.id" :key="'currency-' + currency.id">{{ currency.name }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Date</label>
            <flat-pickr class="form-control" v-model="dividend.date"/>
          </div>
          <div class="col-md-2 d-flex justify-content-end flex-column">
            <button type="button" class="btn btn-danger" @click="removeDividend(di)">Remove</button>
          </div>
        </div>
        <div class="row mt-3" v-if="hasServerValidationError('dividends.' + di + '.company_id')">
          <div class="col-md-12 text-danger" v-html="getServerValidationError('dividends.' + di + '.company_id')"></div>
        </div>
        <div class="row mt-3" v-if="hasServerValidationError('dividends.' + di + '.amount')">
          <div class="col-md-12 text-danger" v-html="getServerValidationError('dividends.' + di + '.amount')"></div>
        </div>
        <div class="row mt-3" v-if="hasServerValidationError('dividends.' + di + '.taxes_amount')">
          <div class="col-md-12 text-danger" v-html="getServerValidationError('dividends.' + di + '.taxes_amount')"></div>
        </div>
        <div class="row mt-3" v-if="hasServerValidationError('dividends.' + di + '.currency_id')">
          <div class="col-md-12 text-danger" v-html="getServerValidationError('dividends.' + di + '.currency_id')"></div>
        </div>
        <div class="row mt-3" v-if="hasServerValidationError('dividends.' + di + '.date')">
          <div class="col-md-12 text-danger" v-html="getServerValidationError('dividends.' + di + '.date')"></div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <button type="button" class="btn btn-primary me-1" @click="addDividend">Add</button>
        </div>
      </div>
      <div class="row mt-3" v-if="hasServerValidationError('dividends')">
        <div class="col-md-12 text-danger" v-html="getServerValidationError('dividends')"></div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <button type="button" class=" btn btn-primary w-100" @click="saveDividends" :disabled="loading">
            <template v-if="loading">Loading...</template>
            <template v-else>Submit</template>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import flatPickr from 'vue-flatpickr-component';
import vSelect from "vue-select";
import useCompaniesSelect from "../../composables/useCompaniesSelect";

const {serverValidationErrors, refreshErrors, clearErrors, hasServerValidationError, getServerValidationError} = useHandleServerValidationErrors();

const props = defineProps({
  selectedPortfolio: {
    type: Object,
    required: false
  },
  portfolios: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['portfolioCreated', 'dividendsCreated']);

const {data: currencies} = await useApiFetch('/currencies');

//parameters needed for dividends
const dividendTemplate = {
  amount: null,
  taxes_amount: null,
  currency_id: null,
  company_id: null,
  // portfolio_id: props.selectedPortfolio ? props.selectedPortfolio.id : null,
  date: null
};

const newPortfolio = ref(false); //toggle create portfolio form

const selectedPortfolioId = ref(null);
const dividends = ref([]);

if(props.selectedPortfolio) {
  selectedPortfolioId.value = props.selectedPortfolio.id;
}

if(!selectedPortfolioId.value) {
  selectedPortfolioId.value = props.portfolios.length > 0 ? props.portfolios[0].id : null;
}

//add and remove dividends
const addDividend = () => {
  dividends.value.push({...dividendTemplate});
};

addDividend();

const removeDividend = (dividendIndex) => {
  dividends.value.splice(dividendIndex, 1);
};

const portfolioCreated = (portfolio) => {
  props.portfolios.push(portfolio);
  selectedPortfolioId.value = portfolio.id;
  newPortfolio.value = false;
  emit('portfolioCreated', props.portfolios);
};

const {fetchCompanies, companiesOptions, searchCompanies} = useCompaniesSelect();
companiesOptions.value = await fetchCompanies();

//fetch and search select2 options
// const fetchCompanies = async (searchString = '') => {
//   const {data: companies} = await useApiFetch('/companies?name=' + searchString);
//
//   return companies.map((element) => {
//     element.label = element.name;
//     return element;
//   })
// };
//
// const companiesOptions = ref([]);
// companiesOptions.value = await fetchCompanies();
//
// const searchCompanies = async (search, loading) => {
//   loading(true);
//   companiesOptions.value = await fetchCompanies(search);
//   loading(false);
// };

const loading = ref(false);

const saveDividends = async () => {
  loading.value = true;
  clearErrors();
  try {
    const {data} = await useApiFetch('/dividends/' + selectedPortfolioId.value + '/create', {method: 'POST', body: {dividends: dividends.value}});
    dividends.value = [];
    loading.value = false;
    emit('dividendsCreated', data);
    useNuxtApp().$toast.success('Dividends added.');
  } catch (error) {
    loading.value = false;
    refreshErrors(error);
    useNuxtApp().$toast.error('There are errors in the form.');
  }
};
</script>
