<template>
  <ul class="nav nav-tabs card-header-tabs">
    <li class="nav-item">
      <NuxtLink to="/portfolios" class="nav-link" exact-active-class="active">All</NuxtLink>
    </li>
    <li class="nav-item" v-for="(portfolio, pi) in portfolios" :key="'portfolio' + portfolio.id">
      <NuxtLink :to="`/portfolios/${portfolio.id}`" class="nav-link" exact-active-class="active">{{ portfolio.name }}</NuxtLink>
    </li>
  </ul>
</template>
<script setup>
const props = defineProps({
  portfolios: {
    type: Object,
    required: false,
  }
});
</script>
