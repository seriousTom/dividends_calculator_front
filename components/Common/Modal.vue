<template>
  <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" @click="$emit('close-modal')"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
<!--        <div class="modal-footer">-->
<!--          <slot name="footer"></slot>-->
<!--          <button type="button" class="btn btn-secondary" @click="$emit('close-modal')">Close</button>-->
<!--          <button type="button" class="btn btn-primary">Save changes</button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  showModal: {
    required: false,
    default: false
  },
  modalTitle: {
    required: false
  }
});
</script>

