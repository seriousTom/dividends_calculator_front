<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body">
              <h5 class="card-title">Login</h5>
              <form @submit.prevent="submit">
                <FormInput v-model="email" :serverValidationErrors="serverValidationErrors" :name="'email'" :label="'Email'" :type="'email'"/>
                <FormInput v-model="password" :serverValidationErrors="serverValidationErrors" :name="'password'" :label="'Password'" :type="'password'"/>
                <button type="submit" class=" btn btn-primary" :disabled="loading">
                  <template v-if="!loading">
                    Login
                  </template>
                  <template v-else>
                    Loading...
                  </template>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {useAuthStore} from '~/store/auth';

definePageMeta({
  layout: 'guest',
  middleware: ["guest"]
});

const {serverValidationErrors, refreshErrors, clearErrors} = useHandleServerValidationErrors();
const authStore = useAuthStore();

const loading = ref(false);

const email = ref('');
const password = ref('');

const submit = async () => {
  loading.value = true;
  clearErrors();
  try {
    const response = await useApiFetch('/login', {method: 'POST', body: {email: email.value, password: password.value}});
    loading.value = false;

    authStore.setLoginData(response.name, response.email, response.token);
    useNuxtApp().$toast.success('Login was successful. You will be redirected to the dashboard soon.');
    navigateTo('/dashboard');
  } catch(error) {
    if(error.status == 401) {
      refreshErrors(error);
      loading.value = false;
      useNuxtApp().$toast.error('Wrong login data.');
    } else {
      refreshErrors(error);
      loading.value = false;
      useNuxtApp().$toast.error('There are errors in the form.');
    }
  }
};

</script>
