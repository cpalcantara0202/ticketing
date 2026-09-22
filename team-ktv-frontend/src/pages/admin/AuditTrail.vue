<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Audit Trail</div>
    <q-table
      v-if="entries.length"
      :rows="entries"
      row-key="id"
      flat
      bordered
    />
    <div v-else class="text-grey">No audit trail entries found.</div>
  </q-page>
</template>

<script setup>
// Audit trail entries are provided as props by the Express route.
defineProps({
  entries: {
    type: Array,
    default: () => [],
  },
});
</script>
