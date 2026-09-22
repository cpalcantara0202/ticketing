<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Backup &amp; Restore</div>
    <div class="q-gutter-sm">
      <q-btn color="primary" label="Backup" @click="backup" />
      <q-btn color="secondary" label="Restore" @click="restore" />
    </div>
  </q-page>
</template>

<script setup>
import { router } from '@inertiajs/vue3';

function backup() {
  router.post('/api/back_up_db');
}

function restore() {
  router.post('/api/restore_db');
}
</script>
