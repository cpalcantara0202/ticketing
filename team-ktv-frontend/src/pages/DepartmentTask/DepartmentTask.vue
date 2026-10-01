<template>
  <q-page class="depttask">
    <!-- Header -->
    <div class="depttask__header">
      <div>
        <h1 class="depttask__title">Department Task</h1>
        <p class="depttask__subtitle">Tickets routed to your department</p>
      </div>
      <q-btn
        flat
        round
        icon="refresh"
        color="teal-8"
        :loading="loading"
        aria-label="Refresh"
        @click="loadCurrentTab"
      />
    </div>

    <!-- Error banner -->
    <q-banner v-if="error" class="bg-red-1 text-red-9 q-mb-md" rounded>
      <template #avatar>
        <q-icon name="error_outline" color="red-8" />
      </template>
      {{ error }}
      <template #action>
        <q-btn flat color="red-9" label="Retry" @click="loadCurrentTab" />
      </template>
    </q-banner>

    <!-- Tabs -->
    <q-card flat bordered class="depttask__card">
      <q-tabs
        v-model="currentTab"
        class="text-teal-8"
        active-color="teal-8"
        indicator-color="teal-7"
        align="left"
        no-caps
        @update:model-value="loadCurrentTab"
      >
        <q-tab v-for="tab in tabs" :key="tab.name" :name="tab.name" :icon="tab.icon">
          <div class="row items-center no-wrap q-gutter-x-xs">
            <span>{{ tab.label }}</span>
            <q-badge v-if="counts[tab.name]" color="red" rounded>
              {{ counts[tab.name] }}
            </q-badge>
          </div>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="currentTab" animated>
        <q-tab-panel v-for="tab in tabs" :key="tab.name" :name="tab.name" class="q-pa-none">
          <q-table
            :rows="rows"
            :columns="tab.columns"
            row-key="ticketid"
            :loading="loading"
            separator="horizontal"
            flat
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            no-data-label="No records found"
          >
            <template #body-cell-priority="props">
              <q-td :props="props">
                <q-chip :color="priorityColor(props.value)" text-color="white" dense square>
                  {{ props.value || '—' }}
                </q-chip>
              </q-td>
            </template>

            <template #body-cell-status="props">
              <q-td :props="props">
                <q-chip :color="statusColor(props.value)" text-color="white" dense square>
                  {{ props.value || '—' }}
                </q-chip>
              </q-td>
            </template>

            <template #body-cell-rating="props">
              <q-td :props="props">
                <q-rating
                  :model-value="Number(props.value) || 0"
                  size="18px"
                  color="amber"
                  readonly
                />
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { QTableProps } from 'quasar';

type TabName = 'Ongoing' | 'ForApproval' | 'ForReview' | 'Done';

interface TicketRow {
  ticketid: number | string;
  subject: string;
  category: string;
  requestor?: string;
  assign_date?: string;
  assigned_date?: string;
  priority: string;
  status?: string;
  assignee?: string;
  assignor?: string;
  completed_date?: string;
  rating?: number;
}

interface TabDef {
  name: TabName;
  label: string;
  icon: string;
  endpoint: string;
  columns: QTableProps['columns'];
}

const router = useRouter();

const loading = ref(false);
const error = ref('');
const currentTab = ref<TabName>('Ongoing');
const rows = ref<TicketRow[]>([]);
const counts = reactive<Record<TabName, number>>({
  Ongoing: 0,
  ForApproval: 0,
  ForReview: 0,
  Done: 0,
});

function col(
  name: string,
  label: string,
  field: string,
  align: 'left' | 'center' | 'right' = 'left'
): NonNullable<QTableProps['columns']>[number] {
  return {
    name,
    label,
    field,
    align,
    headerClasses: 'bg-teal-7 text-white',
    sortable: true,
  };
}

const baseColumns = [
  col('ticketid', 'Ticket ID', 'ticketid', 'center'),
  col('subject', 'Subject', 'subject'),
  col('category', 'Category', 'category'),
  col('requestor', 'Created By', 'requestor'),
  col('priority', 'Priority', 'priority', 'center'),
];

const tabs = computed<TabDef[]>(() => [
  {
    name: 'Ongoing',
    label: 'Ongoing',
    icon: 'sync',
    endpoint: 'unit_head_ongoing',
    columns: [
      ...baseColumns,
      col('assignee', 'Assignee', 'assignee'),
      col('assign_date', 'Assign Date', 'assign_date', 'center'),
    ],
  },
  {
    name: 'ForApproval',
    label: 'For Approval',
    icon: 'approval',
    endpoint: 'unit_head_assigning',
    columns: [
      ...baseColumns,
      col('assign_date', 'Created Date', 'assign_date', 'center'),
    ],
  },
  {
    name: 'ForReview',
    label: 'For Review',
    icon: 'rate_review',
    endpoint: 'unit_head_returned',
    columns: [
      ...baseColumns,
      col('assignee', 'Assignee', 'assignee'),
      col('status', 'Status', 'status', 'center'),
    ],
  },
  {
    name: 'Done',
    label: 'Done',
    icon: 'task',
    endpoint: 'unit_head_done',
    columns: [
      ...baseColumns,
      col('assignee', 'Assignee', 'assignee'),
      col('completed_date', 'Completed Date', 'completed_date', 'center'),
      col('rating', 'Rating', 'rating', 'center'),
    ],
  },
]);

function priorityColor(priority: string): string {
  const p = (priority || '').toLowerCase();
  if (p.includes('high')) return 'red-6';
  if (p.includes('medium')) return 'orange-7';
  if (p.includes('low')) return 'green-6';
  return 'grey-6';
}

function statusColor(status: string): string {
  const s = (status || '').toLowerCase();
  if (s.includes('open') || s.includes('approval')) return 'blue-6';
  if (s.includes('assigned') || s.includes('ongoing') || s.includes('progress'))
    return 'orange-7';
  if (s.includes('closed') || s.includes('resolved') || s.includes('done'))
    return 'green-6';
  if (s.includes('return') || s.includes('misrouted')) return 'red-6';
  return 'grey-6';
}

function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    logged_in_user: localStorage.getItem('logged_in_user') ?? '',
  };
}

function ensureAuthed(): boolean {
  if (!localStorage.getItem('logged_in_user')) {
    localStorage.removeItem('token');
    localStorage.removeItem('logged_in_user');
    localStorage.removeItem('user_role');
    router.push('/login');
    return false;
  }
  return true;
}

async function loadCurrentTab() {
  if (!ensureAuthed()) return;

  const tab = tabs.value.find((t) => t.name === currentTab.value);
  if (!tab) return;

  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${process.env.API_URL}/${tab.endpoint}`, {
      headers: getHeaders(),
    });
    const data = await res.json();

    if (data.status !== 'success') {
      if (res.status === 400 || res.status === 401) {
        router.push('/login');
        return;
      }
      throw new Error(data.message || 'Failed to load department tasks.');
    }

    const list: TicketRow[] = Array.isArray(data.response_data)
      ? data.response_data
      : [];
    rows.value = list;
    counts[tab.name] = list.length;
  } catch (err) {
    console.error('DepartmentTask load error:', err);
    error.value =
      err instanceof Error ? err.message : 'Unable to load department tasks.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadCurrentTab);
</script>

<style lang="scss" scoped src="./DepartmentTask.scss"></style>
