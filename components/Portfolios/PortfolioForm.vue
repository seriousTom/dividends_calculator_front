<template>
  <div v-if="!platformsLoading">
    <FormInput label="Portfolio name" name="name" :serverValidationErrors="serverValidationErrors" v-model="portfolioName" />
    <FormSelect label="Platform" name="platform_id" :serverValidationErrors="serverValidationErrors" :values="platforms" v-model="platformId" />
    <button @click="createPortfolio" type="button" class="btn btn-primary" :disabled="loading">
      <template v-if="!loading">
        Save portfolio
      </template>
      <template v-else>
        Loading...
      </template>
    </button>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
<script setup>
const {serverValidationErrors, refreshErrors, clearErrors} = useHandleServerValidationErrors();

const platformsLoading = ref(true);
const platforms = ref([]);

const portfolioName = ref('');
const platformId = ref(null);

const loading = ref(false);

const emit = defineEmits(['portfolioCreated']);

useApiFetch('/platforms').then(({data}) => {
  platforms.value = data;
  platformsLoading.value = false;
});

const createPortfolio = async () => {
  loading.value = true;
  clearErrors();

  try {
    const response = await useApiFetch('/portfolios/create', {method: 'POST', body: {name: portfolioName.value, platform_id: platformId.value}});
    loading.value = false;
    emit('portfolioCreated', response.data);
    // useNuxtApp().$toast.success('Portfolio created.');
    // navigateTo('/dashboard');
  } catch(error) {
    if(error.status == 422) {
      refreshErrors(error);
      loading.value = false;
      useNuxtApp().$toast.error('Wrong input data');
    } else {
      loading.value = false;
      useNuxtApp().$toast.error('Something wrong happened');
    }
  }
}

</script>
