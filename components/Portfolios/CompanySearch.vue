<template>
  <div class="row my-3">
    <div class="col-md-12">
      <div class="input-group">
        <input type="text" v-model="searchString" class="form-control" placeholder="Company name or ticker" aria-label="Recipient's username with two button addons">
        <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
      </div>
      <div v-if="!searchLoading">
        <div class="list-group mt-2">
          <a v-for="(company, ci) in companies" @click="selectCompany(ci)" href="#" class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{company.name}}</h5>
            </div>
            <p class="mb-1">Ticker: {{ company.ticker }}</p>
          </a>
        </div>
      </div>
      <div v-else>
        Searching...
      </div>
    </div>
  </div>
</template>
<script setup>
import useCompaniesSearch from "../../composables/useCompaniesSearch";

const searchLoading = ref(false);
const searchString = ref('');
const searchResult = ref([]);
const selectedCompany = ref(null);

const props = defineProps({
  rowIndex: {
    required: false,
    default: null
  }
});

const emit = defineEmits(['companySelected']);

const {fetchCompanies, companies} = useCompaniesSearch();

const search = async () => {
  searchLoading.value = true;
  const result = await fetchCompanies(searchString.value);
  searchLoading.value = false;
  searchResult.value = result;


  console.log(result);
};

const selectCompany = (companyIndex) => {
  selectedCompany.value = searchResult.value[companyIndex];
  emit('companySelected', {rowIndex: props.rowIndex, company: selectedCompany.value, searchResult: searchResult.value});
  companies.value = [];
};

</script>
