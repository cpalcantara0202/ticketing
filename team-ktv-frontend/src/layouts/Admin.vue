<template>
  <q-layout view="lHh Lpr 2Ff">

    <q-header elevated class="header">
      <q-toolbar class="header__toolbar">
        <q-btn flat dense round icon="menu" aria-label="Menu" class="toggle" @click="toggleLeftDrawer" />
        <q-space />
        <img class="logo" src="src/assets/logo.svg">
        <q-space />
      </q-toolbar>
    </q-header>

    <q-footer elevated class="f">
        <q-toolbar class="bg-teal-10">
        </q-toolbar>
      </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  localStorage.removeItem('logged_in_user');
  localStorage.removeItem('user_role');
  router.push('/login');
}
</script>
<style lang="scss" scoped src="./Admin.scss"></style>
