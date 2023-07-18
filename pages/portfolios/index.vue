<!--uzkraut portfolio itemus pagal sluga-->
<template>
  <section>
    <div class="card text-center">
      <div class="card-header">
        <PortfoliosNavigation :portfolios="portfolios"/>
      </div>
      <div class="card-body">
        <NuxtPage />
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});

const {portfolios, dividends} = await useApiFetch('/portfolios');
</script>
