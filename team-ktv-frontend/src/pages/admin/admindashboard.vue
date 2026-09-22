<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Admin Dashboard</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-blue-1">
          <q-card-section>
            <div class="text-h6">Open</div>
            <div class="text-h3">{{ counters.open }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-orange-1">
          <q-card-section>
            <div class="text-h6">Assigned</div>
            <div class="text-h3">{{ counters.assigned }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-green-1">
          <q-card-section>
            <div class="text-h6">Resolved</div>
            <div class="text-h3">{{ counters.resolved }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-grey-3">
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
// Counters are provided as props by the Express `/admin` route.
defineProps({
  counters: {
    type: Object,
    default: () => ({ open: 0, assigned: 0, resolved: 0, closed: 0 }),
  },
});
</script>
