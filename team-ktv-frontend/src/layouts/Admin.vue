<template>
  <q-layout view="lHh Lpr 2Ff">

    <q-header elevated class="header">
      <q-toolbar class="header__toolbar">
        <q-btn flat dense round icon="menu" aria-label="Menu" class="toggle" @click="toggleLeftDrawer" />
        <q-space />
        <img class="logo" src="assets/logo.svg" alt="logo">
        <q-space />
      </q-toolbar>
    </q-header>

    <q-footer elevated class="f">
      <q-toolbar class="bg-teal-10" />
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="draw">
      <q-list class="sidebar">
        <Link href="/admin" class="sidebar__item"><q-icon name="dashboard" size="25px" /> Dashboard</Link>
        <Link href="/admin/DepartmentManagement" class="sidebar__item"><q-icon name="home_work" size="25px" /> Departments</Link>
        <Link href="/admin/EmployeeManagement" class="sidebar__item"><q-icon name="group" size="25px" /> Employees</Link>
        <Link href="/admin/JobOrderCategoryManagement" class="sidebar__item"><q-icon name="category" size="25px" /> Job Order Categories</Link>
        <Link href="/admin/Reports" class="sidebar__item"><q-icon name="assessment" size="25px" /> Reports</Link>
        <Link href="/admin/BackupAndRestore" class="sidebar__item"><q-icon name="backup" size="25px" /> Backup &amp; Restore</Link>
        <Link href="/admin/AuditTrail" class="sidebar__item"><q-icon name="history" size="25px" /> Audit Trail</Link>
        <div @click="logout" class="sidebar__item"><q-icon name="logout" size="25px" /> Logout</div>
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

<style lang="scss" scoped src="./Admin.scss"></style>
