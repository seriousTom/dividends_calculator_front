<!--uzkraut portfolio itemus pagal sluga-->
<template>
  <section>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item" v-for="(portfolio, pi) in portfolios" :key="'portfolio' + pi">
            <a class="nav-link" aria-current="true" href="#">{{ portfolio.name }}</a>
          </li>
<!--          <li class="nav-item">-->
<!--            <a class="nav-link active" aria-current="true" href="#">Active</a>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">Link</a>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
<!--          </li>-->
        </ul>
      </div>
      <div class="card-body">
        <NuxtPage/>
        <PortfoliosPortfolio/>
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});
const {data: portfolios} = await useApiFetch('/portfolios');
</script>
