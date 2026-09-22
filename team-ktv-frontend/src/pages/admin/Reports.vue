<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Reports</div>
    <div class="text-grey">Reports coming soon.</div>
  </q-page>
</template>

<script setup>
// Reports are provided as props by the Express route.
defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
});
</script>
