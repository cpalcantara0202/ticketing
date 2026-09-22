<template>
  <div class="fullscreen bg-teal text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="teal"
        unelevated
        href="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
// Standalone 404 page, no layout.
</script>

<script>
export default { layout: null };
</script>
