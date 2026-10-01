<template>
  <q-page class="tasklist">
    <!-- Header -->
    <div class="tasklist__header">
      <div>
        <h1 class="tasklist__title">Task List</h1>
        <p class="tasklist__subtitle">Track and manage your job orders</p>
      </div>
      <q-btn
        unelevated
        color="teal-7"
        icon="add"
        label="Create Job Order"
        no-caps
        @click="openCreateDialog"
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
    <q-card flat bordered class="tasklist__card">
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
            <!-- Priority chip -->
            <template #body-cell-priority="props">
              <q-td :props="props">
                <q-chip
                  :color="priorityColor(props.value)"
                  text-color="white"
                  dense
                  square
                >
                  {{ props.value || '—' }}
                </q-chip>
              </q-td>
            </template>

            <!-- Status chip -->
            <template #body-cell-status="props">
              <q-td :props="props">
                <q-chip
                  :color="statusColor(props.value)"
                  text-color="white"
                  dense
                  square
                >
                  {{ props.value || '—' }}
                </q-chip>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- Create Job Order dialog -->
    <q-dialog v-model="createDialog" persistent>
      <q-card class="create-card">
        <q-card-section class="row items-center q-gutter-sm">
          <q-icon name="create" size="28px" color="teal-7" />
          <div class="text-h6">Create Job Order</div>
        </q-card-section>

        <q-separator />

        <q-form ref="createForm" @submit.prevent="submitTicket">
          <q-card-section class="q-gutter-md">
            <q-input
              v-model="form.subject"
              outlined
              dense
              label="Subject *"
              :rules="[(v) => !!v || 'Subject is required']"
            >
              <template #prepend><q-icon name="subject" /></template>
            </q-input>

            <q-select
              v-model="form.category"
              outlined
              dense
              label="Category *"
              :options="categoryOptions"
              :rules="[(v) => !!v || 'Category is required']"
            >
              <template #prepend><q-icon name="category" /></template>
            </q-select>

            <q-select
              v-model="form.submitted_to"
              outlined
              dense
              label="Department *"
              :options="departmentOptions"
              :rules="[(v) => !!v || 'Department is required']"
            >
              <template #prepend><q-icon name="home" /></template>
            </q-select>

            <q-input
              v-model="form.description"
              outlined
              dense
              type="textarea"
              label="Description *"
              autogrow
              :rules="[(v) => !!v || 'Description is required']"
            >
              <template #prepend><q-icon name="message" /></template>
            </q-input>

            <q-select
              v-model="form.priority"
              outlined
              dense
              label="Priority *"
              :options="priorityOptions"
              :rules="[(v) => !!v || 'Priority is required']"
            >
              <template #prepend><q-icon name="flag" /></template>
            </q-select>

            <q-file
              v-model="form.files"
              outlined
              dense
              multiple
              label="Attachment"
              hint="Optional"
            >
              <template #prepend><q-icon name="attach_file" /></template>
            </q-file>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="grey-8" v-close-popup :disable="submitting" />
            <q-btn
              unelevated
              label="Save"
              color="teal-7"
              type="submit"
              :loading="submitting"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar, QTableProps } from 'quasar';

type TabName = 'MyTask' | 'Submitted' | 'ForReview';

interface TicketRow {
  ticketid: number | string;
  subject: string;
  category: string;
  requestor?: string;
  submitted_to?: string;
  assignee?: string;
  priority: string;
  status?: string;
  assign_date?: string;
  completed_date?: string;
}

interface TabDef {
  name: TabName;
  label: string;
  icon: string;
  columns: QTableProps['columns'];
}

const router = useRouter();
const $q = useQuasar();

const isAdmin = computed(
  () => String(localStorage.getItem('user_role')) === '1'
);

const loading = ref(false);
const submitting = ref(false);
const error = ref('');
const currentTab = ref<TabName>('MyTask');
const rows = ref<TicketRow[]>([]);
const counts = reactive<Record<TabName, number>>({
  MyTask: 0,
  Submitted: 0,
  ForReview: 0,
});

const createDialog = ref(false);
const createForm = ref();
const form = reactive({
  subject: '',
  category: '',
  submitted_to: '',
  description: '',
  priority: '',
  files: null as File[] | null,
});

const categoryOptions = [
  'Incident Report',
  'Service Request',
  'Routine',
  'Ad hoc/Projects',
];
const departmentOptions = [
  'Operations Department',
  'Finance & Admin Department',
  'Marketing Department',
  'IT Department',
];
const priorityOptions = ['High Priority', 'Medium Priority', 'Low Priority'];

// Shared column builder
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

const tabs = computed<TabDef[]>(() => {
  const allTabs: TabDef[] = [
  {
    name: 'MyTask',
    label: 'My Task',
    icon: 'event_available',
    columns: [
      col('ticketid', 'Ticket ID', 'ticketid', 'center'),
      col('subject', 'Subject', 'subject'),
      col('category', 'Category', 'category'),
      col('requestor', 'Created By', 'requestor'),
      col('priority', 'Priority', 'priority', 'center'),
      col('assign_date', 'Assign Date', 'assign_date', 'center'),
    ],
  },
  {
    name: 'Submitted',
    label: 'Submitted',
    icon: 'check_circle_outline',
    columns: [
      col('ticketid', 'Ticket ID', 'ticketid', 'center'),
      col('subject', 'Subject', 'subject'),
      col('category', 'Category', 'category'),
      col('submitted_to', 'Submitted To', 'submitted_to'),
      col('assignee', 'Assignee', 'assignee'),
      col('priority', 'Priority', 'priority', 'center'),
      col('status', 'Status', 'status', 'center'),
    ],
  },
  {
    name: 'ForReview',
    label: 'For Review',
    icon: 'rate_review',
    columns: [
      col('ticketid', 'Ticket ID', 'ticketid', 'center'),
      col('subject', 'Subject', 'subject'),
      col('category', 'Category', 'category'),
      col('submitted_to', 'Submitted To', 'submitted_to'),
      col('assignee', 'Assignee', 'assignee'),
      col('priority', 'Priority', 'priority', 'center'),
      col('completed_date', 'Completed Date', 'completed_date', 'center'),
    ],
  },
  ];

  // Admins (role 1) do not get the For Review tab.
  return isAdmin.value
    ? allTabs.filter((t) => t.name !== 'ForReview')
    : allTabs;
});

// Map each tab to the correct backend endpoint based on the user's role.
// Roles: 1 = Admin, 2 = Assignor, otherwise Creator.
function endpointFor(tab: TabName): string {
  const role = localStorage.getItem('user_role');
  const map: Record<string, Record<TabName, string>> = {
    '1': {
      MyTask: 'get_admin_submitted',
      Submitted: 'get_admin_submitted',
      ForReview: 'get_adminforreview',
    },
    '2': {
      MyTask: 'unit_head_mytask',
      Submitted: 'unit_head_submitted',
      ForReview: 'unit_head_forreview',
    },
    default: {
      MyTask: 'rank_in_file_tasklist',
      Submitted: 'rank_in_file_submitted',
      ForReview: 'rank_in_file_review',
    },
  };
  return (map[role ?? 'default'] ?? map.default)[tab];
}

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

  loading.value = true;
  error.value = '';
  const tab = currentTab.value;
  try {
    const res = await fetch(`${process.env.API_URL}/${endpointFor(tab)}`, {
      headers: getHeaders(),
    });
    const data = await res.json();

    if (data.status !== 'success') {
      if (res.status === 400 || res.status === 401) {
        ensureAuthed();
        router.push('/login');
        return;
      }
      throw new Error(data.message || 'Failed to load tasks.');
    }

    const list: TicketRow[] = Array.isArray(data.response_data)
      ? data.response_data
      : [];
    rows.value = list;
    counts[tab] = list.length;
  } catch (err) {
    console.error('TaskList load error:', err);
    error.value =
      err instanceof Error ? err.message : 'Unable to load tasks.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

function openCreateDialog() {
  form.subject = '';
  form.category = '';
  form.submitted_to = '';
  form.description = '';
  form.priority = '';
  form.files = null;
  createDialog.value = true;
}

async function submitTicket() {
  if (!ensureAuthed()) return;

  submitting.value = true;
  try {
    const res = await fetch(`${process.env.API_URL}/create_ticket`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        subject: form.subject,
        category: form.category,
        submitted_to: form.submitted_to,
        description: form.description,
        priority: form.priority,
      }),
    });
    const data = await res.json();

    if (data.status !== 'success') {
      const msg =
        typeof data.message === 'string'
          ? data.message
          : data.message?.response_data || 'Failed to create job order.';
      throw new Error(msg);
    }

    $q.notify({ type: 'positive', message: 'Job order created successfully.' });
    createDialog.value = false;
    // Refresh the Submitted tab so the new ticket shows up.
    currentTab.value = 'Submitted';
    await loadCurrentTab();
  } catch (err) {
    console.error('Create ticket error:', err);
    $q.notify({
      type: 'negative',
      message: err instanceof Error ? err.message : 'Failed to create job order.',
    });
  } finally {
    submitting.value = false;
  }
}

onMounted(loadCurrentTab);
</script>

<style lang="scss" scoped src="./TaskList.scss"></style>
