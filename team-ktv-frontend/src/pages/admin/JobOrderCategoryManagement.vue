<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Job Order Categories</div>
    <q-table
      v-if="categories.length"
      :rows="categories"
      row-key="id"
      flat
      bordered
    />
    <div v-else class="text-grey">No job order categories found.</div>
  </q-page>
</template>

<script setup>
// Categories are provided as props by the Express route.
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});
</script>
