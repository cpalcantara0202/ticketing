<template>
  <q-page padding>
    <div class="text-grey">Logging out&hellip;</div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { router } from '@inertiajs/vue3';

onMounted(() => {
  router.post('/logout');
});
</script>
