<template>
  <section>
    <div class="container py-5">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Dashboard</h5>
              <div>
                Dashboard stuff
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"]
});

</script>
