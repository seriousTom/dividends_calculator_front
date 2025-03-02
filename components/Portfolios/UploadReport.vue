<template>
  <form>
<!--    <FormSelect-->
<!--        name="platform"-->
<!--        label="Platform"-->
<!--        :values="platforms"-->
<!--        v-model="platform"-->
<!--        @update:modelValue="console.log('ok');"-->
<!--    ></FormSelect>-->
    <FormSelect
        name="platform"
        label="Platform"
        :values="platforms"
        v-model="platform"
    ></FormSelect>
    <div class="mb-3" v-if="selectedPlatform">
      Example file: <a :href="selectedPlatform.file_path">{{ selectedPlatform.file_name }}</a>
    </div>
    <div class="mb-3">
      <label for="file" class="form-label">File</label>
      <div>
        <input id="file" type="file" name="file" @change="e => file = e.target.files[0]">
      </div>
    </div>
    <button type="submit" class="btn btn-primary w-100" @click.prevent="uploadFile">Upload</button>
  </form>
</template>

<script setup>
const platform = ref(null);
const file = ref(null);

const platforms = ref([]);

platforms.value = (await useApiFetch('/platforms')).data;

if(platforms.value.length > 0) {
  platform.value = platforms.value[0].id;
}

const selectedPlatform = computed(() => {
  if(!platform.value) {
    return null;
  }
  return platforms.value.find(p => p.id == platform.value);
});

const uploadFile = () => {
  console.log(file.value);
};

</script>
