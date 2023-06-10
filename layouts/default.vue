<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink to="/login" class="nav-link" active-class="active">{{ authStore.name }}</NuxtLink>
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
</script>
