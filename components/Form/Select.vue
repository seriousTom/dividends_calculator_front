<template>
  <div class="mb-3">
    <label v-if="label" :for="name" class="form-label">{{ label }}</label>
    <select :id="name" @change="$emit('update:modelValue', $event.target.value)" :placeholder="label" class="form-control">
      <template v-if="values.length > 0 && typeof values[0] == 'object'">
        <option v-for="value in values" :value="value.id" :key="'value' + value.id" :selected="value.id == modelValue">{{ value.name }}</option>
      </template>
      <template v-else>
        <option v-for="(value, vi) in values" :value="value" :key="'value' + vi" :selected="value == modelValue">{{ value }}</option>
      </template>
    </select>

    <div v-if="hasServerValidationError(name, serverValidationErrors)" class="text-danger" v-html="getServerValidationError(name, serverValidationErrors)"></div>
  </div>
</template>
<script setup>
const {getServerValidationError, hasServerValidationError} = useHandleServerValidationErrors();
defineProps({
  modelValue: {
    type: [String, Number]
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
  values: {
    type: Array,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>
