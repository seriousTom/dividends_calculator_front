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
              <a href=""><font-awesome-icon icon="fa-solid fa-pen" /></a>
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
</template>
<script setup>
import useApiFetch from "../../composables/useApiFetch";

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
    dividends.value = data.data.map((value) => {
      value.loading = false;
      return value;
    });
    paginationData.value = data.meta;
    dividendsLoading.value = false;
  });
};

const deleteDividend = async (index) => {
  window.confirm('Do you really wish to delete dividend?');

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

const pageChanged = async (page) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set('page', page);

  const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
  window.history.replaceState({}, document.title, newUrl);

  fetchDividends(page);
};

fetchDividends(currentPage);

defineExpose({fetchDividends});
</script>
