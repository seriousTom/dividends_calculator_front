<template>
  <div class="mb-3">
    <label v-if="label" :for="name" class="form-label">
      <input type="checkbox" :id="name" :name="name" :value="defaultValue" @change="$emit('update:modelValue', $event.target.checked)" :checked="modelValue" :placeholder="label">
      {{ label }}
    </label>
    <div v-if="hasServerValidationError(name, serverValidationErrors)" class="text-danger" v-html="getServerValidationError(name, serverValidationErrors)"></div>
  </div>
</template>
<script setup>
const {getServerValidationError, hasServerValidationError} = useHandleServerValidationErrors();

defineProps({
  modelValue: {
    type: Boolean
  },
  serverValidationErrors: {
    type: Object,
    required: false,
  },
  label: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  defaultValue: {
    type: Boolean,
    required: false,
    default: true
  }
});

defineEmits(['update:modelValue']);
</script>
