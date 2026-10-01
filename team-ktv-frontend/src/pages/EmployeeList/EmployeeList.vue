<template>
  <q-page class="emplist">
    <!-- Header -->
    <div class="emplist__header">
      <div>
        <h1 class="emplist__title">Users</h1>
        <p class="emplist__subtitle">{{ subtitle }}</p>
      </div>
      <div class="row items-center q-gutter-sm">
        <q-btn
          unelevated
          color="teal-7"
          icon="person_add"
          label="Create User"
          no-caps
          @click="openCreateDialog"
        />
      </div>
    </div>

    <!-- Error banner -->
    <q-banner v-if="error" class="bg-red-1 text-red-9 q-mb-md" rounded>
      <template #avatar>
        <q-icon name="error_outline" color="red-8" />
      </template>
      {{ error }}
      <template #action>
        <q-btn flat color="red-9" label="Retry" @click="loadEmployees" />
      </template>
    </q-banner>

    <q-card flat bordered class="emplist__card">
      <!-- Search / filter toolbar -->
      <div class="emplist__toolbar">
        <q-input
          v-model="search"
          outlined
          dense
          debounce="200"
          placeholder="Search name or ID"
          clearable
          class="emplist__search"
        >
          <template #prepend><q-icon name="search" /></template>
        </q-input>
      </div>

      <q-separator />

      <q-table
        :rows="filteredRows"
        :columns="columns"
        row-key="user_number"
        :loading="loading"
        separator="horizontal"
        flat
        :rows-per-page-options="[5, 10, 15, 20, 0]"
        no-data-label="No employees found"
      >
        <template #body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap q-gutter-x-sm">
              <q-avatar color="teal-6" text-color="white" size="28px">
                {{ initials(props.row) }}
              </q-avatar>
              <span>{{ props.value }}</span>
            </div>
          </q-td>
        </template>

        <template #body-cell-role="props">
          <q-td :props="props">
            <q-chip :color="roleColor(props.value)" text-color="white" dense square>
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-ongoing="props">
          <q-td :props="props">
            <q-badge color="orange-7" :label="props.value" />
          </q-td>
        </template>

        <template #body-cell-completed="props">
          <q-td :props="props">
            <q-badge color="green-6" :label="props.value" />
          </q-td>
        </template>

        <template #body-cell-rating="props">
          <q-td :props="props">
            <div class="row items-center justify-center no-wrap q-gutter-x-xs">
              <q-rating
                :model-value="Number(props.value) || 0"
                size="16px"
                color="amber"
                icon="star"
                readonly
              />
              <span class="rating-value">
                {{ Number(props.value) ? Number(props.value).toFixed(2) : '—' }}
              </span>
            </div>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="props.row.active ? 'green-6' : 'grey-6'"
              text-color="white"
              dense
              square
            >
              {{ props.row.active ? 'Active' : 'Deactivated' }}
            </q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Create User dialog -->
    <q-dialog v-model="createDialog" persistent>
      <q-card class="create-user-card">
        <q-card-section class="row items-center q-gutter-sm">
          <q-icon name="person_add" size="28px" color="teal-7" />
          <div class="text-h6">Create User</div>
        </q-card-section>

        <q-separator />

        <q-form ref="createForm" @submit.prevent="submitUser">
          <q-card-section class="q-gutter-md">
            <div class="row q-col-gutter-md">
              <q-input
                class="col-12 col-sm-6"
                v-model="userForm.firstname"
                outlined
                dense
                label="First Name *"
                :rules="[(v) => !!v || 'First name is required']"
              >
                <template #prepend><q-icon name="person" /></template>
              </q-input>
              <q-input
                class="col-12 col-sm-6"
                v-model="userForm.lastname"
                outlined
                dense
                label="Last Name *"
                :rules="[(v) => !!v || 'Last name is required']"
              >
                <template #prepend><q-icon name="person" /></template>
              </q-input>
            </div>

            <q-input
              v-model="userForm.username"
              outlined
              dense
              label="Username *"
              :rules="[(v) => !!v || 'Username is required']"
            >
              <template #prepend><q-icon name="account_circle" /></template>
            </q-input>

            <q-select
              v-model="userForm.department"
              outlined
              dense
              label="Department *"
              :options="departmentOptions"
              :rules="[(v) => !!v || 'Department is required']"
            >
              <template #prepend><q-icon name="domain" /></template>
            </q-select>

            <q-select
              v-model="userForm.user_role"
              outlined
              dense
              label="Role *"
              :options="roleOptions"
              emit-value
              map-options
              :rules="[(v) => v != null || 'Role is required']"
            >
              <template #prepend><q-icon name="manage_accounts" /></template>
            </q-select>

            <q-input
              v-model="userForm.password"
              outlined
              dense
              :type="showPwd ? 'text' : 'password'"
              label="Password *"
              hint="At least 6 characters"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) => v.length >= 6 || 'Minimum 6 characters',
              ]"
            >
              <template #prepend><q-icon name="lock" /></template>
              <template #append>
                <q-icon
                  name="autorenew"
                  class="cursor-pointer"
                  @click="generatePassword"
                >
                  <q-tooltip>Generate random password</q-tooltip>
                </q-icon>
                <q-icon
                  :name="showPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer q-ml-sm"
                  @click="showPwd = !showPwd"
                />
              </template>
            </q-input>

            <q-input
              v-model="userForm.password_conf"
              outlined
              dense
              :type="showPwd ? 'text' : 'password'"
              label="Confirm Password *"
              :rules="[
                (v) => !!v || 'Please confirm the password',
                (v) => v === userForm.password || 'Passwords do not match',
              ]"
            >
              <template #prepend><q-icon name="lock" /></template>
            </q-input>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="grey-8" v-close-popup :disable="savingUser" />
            <q-btn
              unelevated
              label="Save"
              color="teal-7"
              type="submit"
              :loading="savingUser"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { QTableProps, useQuasar } from 'quasar';

interface RawEmployee {
  _id?: string;
  user_number?: number | string;
  firstname?: string;
  lastname?: string;
  full_name?: string;
  username?: string;
  department?: string;
  user_role?: number | string;
  role_name?: string;
  designation?: string;
  total_tickets_assigned?: number;
  total_tickets_closed?: number;
  average_rating?: number;
  rated_tickets?: number;
  status?: number | string;
}

interface EmployeeRow {
  user_number: number | string;
  name: string;
  firstname: string;
  lastname: string;
  designation: string;
  role: string;
  department: string;
  ongoing: number;
  completed: number;
  rating: number;
  ratedTickets: number;
  active: boolean;
}

const router = useRouter();
const $q = useQuasar();

const loading = ref(false);
const error = ref('');
const search = ref('');
const rows = ref<EmployeeRow[]>([]);

// --- Create User dialog state ---
const createDialog = ref(false);
const createForm = ref();
const savingUser = ref(false);
const showPwd = ref(false);

const userForm = reactive({
  firstname: '',
  lastname: '',
  username: '',
  department: '',
  user_role: null as number | null,
  password: '',
  password_conf: '',
});

const departmentOptions = [
  'Operations Department',
  'Finance & Admin Department',
  'Marketing Department',
  'IT Department',
];

const roleOptions = [
  { label: 'Admin', value: 1 },
  { label: 'Assignor', value: 2 },
  { label: 'Creator', value: 3 },
];

// Generate a secure random password and fill both password fields.
function generatePassword() {
  const length = 12;
  const charset =
    'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
  let result = '';

  const cryptoObj = window.crypto;
  if (cryptoObj && cryptoObj.getRandomValues) {
    const values = new Uint32Array(length);
    cryptoObj.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
  } else {
    // Fallback (older browsers)
    for (let i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
  }

  userForm.password = result;
  userForm.password_conf = result;
  showPwd.value = true; // reveal so the admin can read/copy it

  $q.notify({
    type: 'info',
    message: 'Random password generated and filled in both fields.',
  });
}

function openCreateDialog() {
  userForm.firstname = '';
  userForm.lastname = '';
  userForm.username = '';
  userForm.department = '';
  userForm.user_role = null;
  userForm.password = '';
  userForm.password_conf = '';
  showPwd.value = false;
  createDialog.value = true;
}

async function submitUser() {
  if (!ensureAuthed()) return;

  savingUser.value = true;
  try {
    const res = await fetch(`${process.env.API_URL}/add_user`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        firstname: userForm.firstname,
        lastname: userForm.lastname,
        username: userForm.username,
        department: userForm.department,
        user_role: userForm.user_role,
        password: userForm.password,
        password_conf: userForm.password_conf,
      }),
    });
    const data = await res.json();

    if (data.status !== 'success') {
      const msg =
        typeof data.message === 'string'
          ? data.message
          : data.message?.response_data || 'Failed to create user.';
      throw new Error(msg);
    }

    $q.notify({ type: 'positive', message: 'User created successfully.' });
    createDialog.value = false;
    await loadEmployees();
  } catch (err) {
    console.error('Create user error:', err);
    $q.notify({
      type: 'negative',
      message: err instanceof Error ? err.message : 'Failed to create user.',
    });
  } finally {
    savingUser.value = false;
  }
}

// Admin (role 1) oversees every department; assignors see their own team.
const isAdmin = computed(() => String(localStorage.getItem('user_role')) === '1');

const subtitle = computed(() =>
  isAdmin.value
    ? 'All users across departments'
    : 'Members of your department and their workload'
);

const columns = computed<QTableProps['columns']>(() => {
  const base: NonNullable<QTableProps['columns']> = [
    {
      name: 'user_number',
      label: 'Employee ID',
      field: 'user_number',
      align: 'center',
      headerClasses: 'bg-teal-7 text-white',
      sortable: true,
    },
    {
      name: 'name',
      label: 'Name',
      field: 'name',
      align: 'left',
      headerClasses: 'bg-teal-7 text-white',
      sortable: true,
    },
    {
      name: 'designation',
      label: 'Designation',
      field: 'designation',
      align: 'left',
      headerClasses: 'bg-teal-7 text-white',
      sortable: true,
    },
    {
      name: 'role',
      label: 'Role',
      field: 'role',
      align: 'center',
      headerClasses: 'bg-teal-7 text-white',
      sortable: true,
    },
  ];

  if (isAdmin.value) {
    // Admins see everyone, so department is meaningful; workload counts
    // aren't provided by the all-users endpoint.
    base.push({
      name: 'department',
      label: 'Department',
      field: 'department',
      align: 'left',
      headerClasses: 'bg-teal-7 text-white',
      sortable: true,
    });
  } else {
    base.push(
      {
        name: 'ongoing',
        label: 'Ongoing',
        field: 'ongoing',
        align: 'center',
        headerClasses: 'bg-teal-7 text-white',
        sortable: true,
      },
      {
        name: 'completed',
        label: 'Completed',
        field: 'completed',
        align: 'center',
        headerClasses: 'bg-teal-7 text-white',
        sortable: true,
      },
      {
        name: 'rating',
        label: 'Avg. Rating',
        field: 'rating',
        align: 'center',
        headerClasses: 'bg-teal-7 text-white',
        sortable: true,
      }
    );
  }

  // Status column shown for all roles.
  base.push({
    name: 'status',
    label: 'Status',
    field: 'active',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    sortable: true,
  });

  return base;
});

function roleLabel(role: number | string | undefined): string {
  switch (String(role)) {
    case '1':
      return 'Admin';
    case '2':
      return 'Assignor';
    default:
      return 'Creator';
  }
}

// Normalize the readable role names returned by /get_activeuser.
function normalizeRoleName(name: string | undefined): string {
  switch ((name || '').toLowerCase()) {
    case 'administrator':
      return 'Admin';
    case 'unit head':
      return 'Assignor';
    case 'rank and file':
      return 'Creator';
    default:
      return name || 'Creator';
  }
}

function roleColor(role: string): string {
  switch (role) {
    case 'Admin':
      return 'deep-purple-6';
    case 'Assignor':
      return 'blue-7';
    case 'Creator':
      return 'teal-6';
    default:
      return 'grey-6';
  }
}

// Designation label shown separately from the system role.
// Role (Admin/Assignor/Creator) and Designation (Administrator/Department
// Head/Staff) are both derived from the same user_role value.
function designationForRole(roleName: string): string {
  switch (roleName) {
    case 'Admin':
      return 'Administrator';
    case 'Assignor':
      return 'Department Head';
    case 'Creator':
      return 'Staff';
    default:
      return roleName;
  }
}

function initials(row: EmployeeRow): string {
  const f = row.firstname?.[0] ?? '';
  const l = row.lastname?.[0] ?? '';
  return (f + l).toUpperCase() || '?';
}

const filteredRows = computed(() => {
  const term = search.value?.trim().toLowerCase();
  if (!term) return rows.value;
  return rows.value.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      String(r.user_number).toLowerCase().includes(term)
  );
});

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

async function loadEmployees() {
  if (!ensureAuthed()) return;

  loading.value = true;
  error.value = '';

  // Admins list everyone via /get_allusers; assignors list their own team
  // via /employee_ratings (which includes each employee's average rating).
  const endpoint = isAdmin.value ? 'get_allusers' : 'employee_ratings';

  try {
    const res = await fetch(`${process.env.API_URL}/${endpoint}`, {
      headers: getHeaders(),
    });
    const data = await res.json();

    if (data.status !== 'success') {
      if (res.status === 400 || res.status === 401) {
        router.push('/login');
        return;
      }
      throw new Error(data.message || 'Failed to load employees.');
    }

    const list: RawEmployee[] = Array.isArray(data.response_data)
      ? data.response_data
      : [];

    rows.value = list.map((e) => {
      // /get_activeuser returns full_name + role_name (no ticket counts);
      // /search_employee returns firstname/lastname + user_role + counts.
      const name =
        e.full_name ||
        `${e.firstname ?? ''} ${e.lastname ?? ''}`.trim() ||
        '—';
      const [firstname = '', lastname = ''] = (e.full_name ?? '').split(' ');

      const roleName = e.role_name
        ? normalizeRoleName(e.role_name)
        : roleLabel(e.user_role);

      return {
        user_number: e.user_number ?? '—',
        name,
        firstname: e.firstname ?? firstname,
        lastname: e.lastname ?? lastname,
        designation: e.designation || designationForRole(roleName),
        role: roleName,
        department: e.department ?? '—',
        ongoing: Number(e.total_tickets_assigned) || 0,
        completed: Number(e.total_tickets_closed) || 0,
        rating: Number(e.average_rating) || 0,
        ratedTickets: Number(e.rated_tickets) || 0,
        active: String(e.status) === '1',
      };
    });
  } catch (err) {
    console.error('EmployeeList load error:', err);
    error.value =
      err instanceof Error ? err.message : 'Unable to load employees.';
    rows.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadEmployees);
</script>

<style lang="scss" scoped src="./EmployeeList.scss"></style>
