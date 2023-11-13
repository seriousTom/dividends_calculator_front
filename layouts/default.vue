<template>
  <NuxtLoadingIndicator />
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <NuxtLink to="/dashboard" class="navbar-brand" active-class="active">Home</NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-5 mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink to="/portfolios" class="nav-link" active-class="active">Portfolios</NuxtLink>
<!--              <a class="nav-link" href="#">Portfolios</a>-->
            </li>
            <li class="nav-item">
              <NuxtLink to="/statistics" class="nav-link" active-class="active">Statistics</NuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-bs-toggle="dropdown" aria-expanded="false">{{ authStore.name }}</a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <slot />
</template>
<script setup>
import {useAuthStore} from '~/store/auth';
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>
