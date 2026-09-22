<template>
  <q-layout view="lHh Lpr 2Ff">

    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="toggle"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated class="f">
      <q-toolbar class="bg-teal-10" />
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="draw">
      <q-list class="sidebar">
        <q-item-label header style="padding: 0%;">
          <img class="logo" src="assets/logo.svg" alt="logo">
        </q-item-label>
        <Link href="/" class="sidebar__item"><q-icon name="home" class="home-icon" size="25px" /> Dashboard</Link>
        <Link href="/TaskList" class="sidebar__item"><q-icon name="assignment" class="assignment-icon" size="25px" /> Task List</Link>
        <Link href="/DepartmentTask" class="sidebar__item"><q-icon name="home_work" class="homework-icon" size="25px" /> Department Task</Link>
        <Link href="/EmployeeList" class="sidebar__item"><q-icon name="assignment_ind" class="emplist-icon" size="25px" /> Employee List</Link>
        <div @click="logout" class="sidebar__item"><q-icon name="logout" class="logout-icon" size="25px" /> Logout</div>

        <q-item-label header style="padding: 0%;">
          <img class="pic2" style="width: 280px; margin-top: 40px;" src="assets/pic.jpg" alt="">
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  router.post('/logout');
}
</script>

<style lang="scss" scoped src="./MainLayout.scss"></style>
