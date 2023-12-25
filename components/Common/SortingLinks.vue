<template>
  <font-awesome-icon v-if="fieldToSort == activeField && order == 'asc'" icon="fa-solid fa-arrow-up" />
  <a v-else @click.prevent="sortingClicked(fieldToSort, 'asc')" href="" class="me-1"><font-awesome-icon icon="fa-solid fa-arrow-up" /></a>
  <font-awesome-icon v-if="fieldToSort != activeField && order == 'asc'" icon="fa-solid fa-arrow-down" />
  <a v-else @click.prevent="sortingClicked(fieldToSort, 'desc')" href=""><font-awesome-icon icon="fa-solid fa-arrow-down" /></a>
</template>
<script setup>
const props = defineProps({
  fieldToSort: {
    type: String,
    required: false
  },
  activeField: {
    type: String,
    required: false
  },
  order: {
    type: String,
    required: false
  },
});

const emit = defineEmits(['sorted']);

const sortingClicked = (field, order) => {
  emit('sorted', field, order);
};
</script>
