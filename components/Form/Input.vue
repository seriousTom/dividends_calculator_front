<template>
  <div class="mb-3">
    <label v-if="label" :for="label" class="form-label">{{ label }}</label>
    <input :type="type" class="form-control" :id="label" :name="name" v-model="inputValue" @input="onInput" :placeholder="label">
    <div v-if="hasServerValidationError(name, serverValidationErrors)" class="text-danger" v-html="getServerValidationError(name, serverValidationErrors)"></div>
  </div>
</template>
<script setup>
const {getServerValidationError, hasServerValidationError} = useHandleServerValidationErrors();

const props = defineProps({
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
  type: {
    type: String,
    required: false,
    default: 'text'
  }
});

const inputValue = ref('');
const emit = defineEmits(['update:modelValue']);

const onInput = () => {
  emit('update:modelValue', inputValue.value);
}
</script>
