<template>
  <select v-model="model" class="select">
    <option :value="allValue">All</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  allValue: {
    type: Number,
    required: true,
  },
});

const model = defineModel();
</script>

<style scoped>
.select {
  padding: 6px;
}
</style>
