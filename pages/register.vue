<template>
  <section>
    <div class="container py-5">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Register</h5>
              <form method="post" @submit.prevent="submit">
                <FormInput v-model="name" :serverValidationErrors="serverValidationErrors" :name="'name'" :label="'Name'"/>
                <FormInput v-model="email" :serverValidationErrors="serverValidationErrors" :name="'email'" :label="'Email'" :type="'email'"/>
                <FormInput v-model="password" :serverValidationErrors="serverValidationErrors" :name="'password'" :label="'Password'" :type="'password'"/>
                <FormInput v-model="password_confirmation" :serverValidationErrors="serverValidationErrors" :name="'password_confirmation'" :label="'Password confirmation'" :type="'password'"/>
                <button type="submit" class=" btn btn-primary" :disabled="loading">
                  <template v-if="!loading">
                    Register
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

definePageMeta({
  layout: 'guest'
});

const {serverValidationErrors, refreshErrors, clearErrors, hasServerValidationError, getServerValidationError} = useHandleServerValidationErrors();

const loading = ref(false);

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const submit = async () => {
  loading.value = true;
  clearErrors();
  try {
    const response = await useApiFetch('/register', {method: 'POST', body: {name: name.value, email: email.value, password: password.value, password_confirmation: password_confirmation.value}});
    loading.value = false;
    console.log(response);
  } catch(error) {
    refreshErrors(error);
    loading.value = false;
    console.log(error);
  }
};
</script>
