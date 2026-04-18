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
        <q-toolbar class="bg-blue-10">
        </q-toolbar>
      </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="draw">
      <q-list class="sidebar">
        <q-item-label header style="padding: 0%;">
          <img class="logo" src="src/assets/logo.svg">
        </q-item-label>
        <div @click="$router.push('/admin')" class="sidebar__item"> <q-icon name="home" class="home-icon" size="25px" /> Dashboard</div>
        <div @click="$router.push('/admin/DepartmentManagement')" class="sidebar__item"><q-icon name="domain" class="assignment-icon" size="25px" /> Department Management</div>
        <div @click="$router.push('/admin/EmployeeManagement')" class="sidebar__item"> <q-icon name="group" class="homework-icon" size="25px" /> Employee Management</div>
        <div @click="$router.push('/admin/JobOrderCategoryManagement')" class="sidebar__item"> <q-icon name="assignment_ind" class="emplist-icon" size="25px" /> Job Order Category <br> Management</div>
        <div @click="$router.push('/admin/Reports')" class="sidebar__item"> <q-icon name="bar_chart" class="logout-icon" size="25px"  /> Reports</div>
        <div @click="$router.push('/admin/BackupAndRestore')" class="sidebar__item"> <q-icon name="settings_backup_restore" class="logout-icon" size="25px"  /> Backup & Restore</div>
        <div @click="$router.push('/admin/AuditTrain')" class="sidebar__item"> <q-icon name="logout" class="logout-icon" size="25px"  /> Audit Train</div>
        <div @click="logout" class="sidebar__item"> <q-icon name="logout" class="logout-icon" size="25px"  /> Logout</div>
      </q-list>
    </q-drawer>

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
