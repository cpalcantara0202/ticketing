<template>
  <q-page class="dashboard">
    <div class="dashboard__header">
      <div>
        <h1 class="dashboard__title">Dashboard</h1>
        <p class="dashboard__subtitle">Overview of your job orders</p>
      </div>
      <q-btn
        flat
        round
        icon="refresh"
        color="teal-8"
        :loading="loading"
        aria-label="Refresh"
        @click="loadStats"
      />
    </div>

    <!-- Error banner -->
    <q-banner v-if="error" class="bg-red-1 text-red-9 q-mb-md" rounded>
      <template #avatar>
        <q-icon name="error_outline" color="red-8" />
      </template>
      {{ error }}
      <template #action>
        <q-btn flat color="red-9" label="Retry" @click="loadStats" />
      </template>
    </q-banner>

    <!-- Stat cards -->
    <div class="stat-grid">
      <div
        v-for="card in cards"
        :key="card.key"
        class="stat-card"
        :style="{ '--accent': card.color }"
      >
        <div class="stat-card__icon">
          <q-icon :name="card.icon" size="28px" />
        </div>
        <div class="stat-card__body">
          <div class="stat-card__value">
            <q-skeleton v-if="loading" type="text" width="40px" />
            <template v-else>{{ stats[card.key] ?? 0 }}</template>
          </div>
          <div class="stat-card__label">{{ card.label }}</div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <h2 class="dashboard__section">Quick actions</h2>
    <div class="actions">
      <div class="action" @click="router.push('/dashboard/TaskList')">
        <q-icon name="assignment" size="34px" />
        <span>Task List</span>
      </div>
      <div v-if="!isCreator && !isAdmin" class="action" @click="router.push('/dashboard/DepartmentTask')">
        <q-icon name="home_work" size="34px" />
        <span>Department Task</span>
      </div>
      <div v-if="!isCreator" class="action" @click="router.push('/dashboard/EmployeeList')">
        <q-icon name="assignment_ind" size="34px" />
        <span>Users</span>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

type StatKey = 'Submitted' | 'InProgress' | 'ForReview' | 'Completed';

interface CardDef {
  key: StatKey;
  label: string;
  icon: string;
  color: string;
}

const router = useRouter();

const loading = ref(false);
const error = ref('');
const stats = reactive<Record<StatKey, number>>({
  Submitted: 0,
  InProgress: 0,
  ForReview: 0,
  Completed: 0,
});

const isAssignor = computed(
  () => String(localStorage.getItem('user_role')) === '2'
);

const isCreator = computed(
  () => String(localStorage.getItem('user_role')) === '3'
);

const isAdmin = computed(
  () => String(localStorage.getItem('user_role')) === '1'
);

const allCards: Record<StatKey, CardDef> = {
  Submitted: { key: 'Submitted', label: 'Submitted', icon: 'inbox', color: '#00897b' },
  InProgress: { key: 'InProgress', label: 'In Progress', icon: 'autorenew', color: '#1e88e5' },
  ForReview: { key: 'ForReview', label: 'For Review', icon: 'rate_review', color: '#f9a825' },
  Completed: { key: 'Completed', label: 'Completed', icon: 'task_alt', color: '#43a047' },
};

// Card visibility by role:
//  - Assignor (2): In Progress, For Review, Completed
//  - Creator  (3): Submitted, In Progress, Completed (no For Review)
//  - Admin    (1): Submitted, In Progress, Completed (no For Review)
const cards = computed<CardDef[]>(() => {
  if (isAssignor.value) {
    return [allCards.InProgress, allCards.ForReview, allCards.Completed];
  }
  // Admins and Creators: no For Review card.
  return [allCards.Submitted, allCards.InProgress, allCards.Completed];
});

function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    logged_in_user: localStorage.getItem('logged_in_user') ?? '',
  };
}

async function loadStats() {
  const loggedInUser = localStorage.getItem('logged_in_user');

  // No valid session — clear anything stale and send the user to login
  // instead of firing an API call the backend will reject.
  if (!loggedInUser) {
    localStorage.removeItem('token');
    localStorage.removeItem('logged_in_user');
    localStorage.removeItem('user_role');
    router.push('/login');
    return;
  }

  // Assignors use their own dashboard counter endpoint (different field names).
  const endpoint = isAssignor.value ? 'get_unittask' : 'get_admincount';

  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${process.env.API_URL}/${endpoint}`, {
      headers: getHeaders(),
    });
    const data = await res.json();

    if (data.status !== 'success') {
      // Auth failures (stale/invalid account) mean the session is no longer
      // valid — clear it and return to the login page.
      if (res.status === 400 || res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('logged_in_user');
        localStorage.removeItem('user_role');
        router.push('/login');
        return;
      }
      throw new Error(data.message || 'Failed to load dashboard data.');
    }

    const d = data.response_data ?? {};
    if (isAssignor.value) {
      // /get_unittask fields: inprogress, forreview, done
      stats.Submitted = 0;
      stats.InProgress = Number(d.inprogress) || 0;
      stats.ForReview = Number(d.forreview) || 0;
      stats.Completed = Number(d.done) || 0;
    } else {
      // /get_admincount fields: Submitted, InProgress, ForReview, Completed
      stats.Submitted = Number(d.Submitted) || 0;
      stats.InProgress = Number(d.InProgress) || 0;
      stats.ForReview = Number(d.ForReview) || 0;
      stats.Completed = Number(d.Completed) || 0;
    }
  } catch (err) {
    console.error('Dashboard load error:', err);
    error.value =
      err instanceof Error ? err.message : 'Unable to load dashboard data.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadStats);
</script>

<style lang="scss" scoped src="./Dashboard.scss"></style>
