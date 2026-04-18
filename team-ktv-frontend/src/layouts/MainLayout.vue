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
        <div @click="$router.push('/')" class="sidebar__item"> <q-icon name="home" class="home-icon" size="25px" /> Dashboard</div>
        <div @click="$router.push('/TaskList')" class="sidebar__item"><q-icon name="assignment" class="assignment-icon" size="25px" /> Task List</div>
        <div @click="$router.push('/DepartmentTask')" class="sidebar__item"> <q-icon name="home_work" class="homework-icon" size="25px" /> Department Task</div>
        <div @click="$router.push('/EmployeeList')" class="sidebar__item"> <q-icon name="assignment_ind" class="emplist-icon" size="25px" /> Employee List</div>
        <div @click="logout" class="sidebar__item"> <q-icon name="logout" class="logout-icon" size="25px"  /> Logout</div>

        <q-item-label header style="padding: 0%;">
          <img class="pic2" style="width: 280px; margin-top: 40px;" src="src/assets/pic.jpg">
        </q-item-label>
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
<style lang="scss" scoped src="./MainLayout.scss"></style>
