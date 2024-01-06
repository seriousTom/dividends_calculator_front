<template>
  <span>
    <span v-if="fieldToSort == activeField && order == 'asc'">
      <font-awesome-icon icon="fa-solid fa-arrow-up" />
    </span>
    <span v-else>
      <a  @click.prevent="sortingClicked(fieldToSort, 'asc')" href="" class="me-1"><font-awesome-icon icon="fa-solid fa-arrow-up" /></a>
    </span>
  </span>

  <span>
    <span v-if="fieldToSort == activeField && order == 'desc'">
      <font-awesome-icon icon="fa-solid fa-arrow-down" />
    </span>
    <span v-else>
      <a @click.prevent="sortingClicked(fieldToSort, 'desc')" href=""><font-awesome-icon icon="fa-solid fa-arrow-down" /></a>
    </span>
  </span>
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
  console.log(field, order);
  emit('sorted', field, order);
};
</script>
