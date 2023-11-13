<template>
  <section>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12">

        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Dashboard</h5>
          <div>
            Dashboard stuff
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
