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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-bs-toggle="dropdown" aria-expanded="false">{{ authStore.name }}</a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
<!--              <NuxtLink to="/login" class="nav-link" active-class="active"></NuxtLink>-->
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
