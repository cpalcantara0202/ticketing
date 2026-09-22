<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-4">
        <q-card class="bg-orange-1">
          <q-card-section>
            <div class="text-h6">Pending</div>
            <div class="text-h3">{{ counters.pending }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="bg-green-1">
          <q-card-section>
            <div class="text-h6">Resolved</div>
            <div class="text-h3">{{ counters.resolved }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card class="bg-blue-1">
          <q-card-section>
            <div class="text-h6">Closed</div>
            <div class="text-h3">{{ counters.closed }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Counters are provided as props by the Express `/` route.
defineProps({
  counters: {
    type: Object,
    default: () => ({ pending: 0, resolved: 0, closed: 0 }),
  },
});
</script>

<style lang="scss" scoped src="./Dashboard.scss"></style>
