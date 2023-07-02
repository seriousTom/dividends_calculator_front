<template>
  <section>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Dashboard</h5>
        <div>
          Dashboard stuff
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
