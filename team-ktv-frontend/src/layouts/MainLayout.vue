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
        <q-btn
          v-if="route.path !== '/'"
          flat dense round
          icon="arrow_back"
          aria-label="Back"
          @click="router.back()"
          class="q-ml-sm"
        />

        <q-space />

        <div class="user-info row items-center no-wrap q-gutter-x-sm">
          <q-avatar color="white" text-color="teal-8" size="32px">
            {{ userInitials }}
          </q-avatar>
          <div class="column items-end">
            <span class="user-info__name">{{ userName || 'User' }}</span>
            <span class="user-info__role">{{ userRole }}</span>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer elevated class="f">
        <q-toolbar class="bg-teal-10">
        </q-toolbar>
      </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="draw">
      <q-list class="sidebar">
        <q-item-label header style="padding: 0%;">
          <img class="logo" :src="logo">
        </q-item-label>

        <div @click="$router.push('/dashboard')" class="sidebar__item"> <q-icon name="home" class="home-icon" size="25px" /> Dashboard</div>
        <div @click="$router.push('/dashboard/TaskList')" class="sidebar__item"><q-icon name="assignment" class="assignment-icon" size="25px" /> Task List</div>
        <div v-if="!isCreator && !isAdmin" @click="$router.push('/dashboard/DepartmentTask')" class="sidebar__item"> <q-icon name="home_work" class="homework-icon" size="25px" /> Department Task</div>
        <div v-if="!isCreator" @click="$router.push('/dashboard/EmployeeList')" class="sidebar__item"> <q-icon name="assignment_ind" class="emplist-icon" size="25px" /> Users</div>
        <div @click="logout" class="sidebar__item"> <q-icon name="logout" class="logout-icon" size="25px"  /> Logout</div>

        <q-item-label header style="padding: 0%;">
          <img class="pic2" style="width: 280px; margin-top: 40px;" :src="pic">
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container class="app-bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import logo from 'src/assets/logo.svg';
import pic from 'src/assets/pic.webp';

const router = useRouter();
const route = useRoute();
const leftDrawerOpen = ref(false)

const userName = computed(() => localStorage.getItem('user_name') ?? '');

const isCreator = computed(
  () => String(localStorage.getItem('user_role')) === '3'
);

const isAdmin = computed(
  () => String(localStorage.getItem('user_role')) === '1'
);

const userRole = computed(() => {
  switch (String(localStorage.getItem('user_role'))) {
    case '1':
      return 'Admin';
    case '2':
      return 'Assignor';
    default:
      return 'Creator';
  }
});

const userInitials = computed(() => {
  const parts = userName.value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase();
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('logged_in_user');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_name');
  router.push('/login');
}
</script>
<style lang="scss" scoped src="./MainLayout.scss"></style>
