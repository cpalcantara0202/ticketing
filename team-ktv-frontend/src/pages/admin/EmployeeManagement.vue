<template>
  <q-page padding>
    <!--------------------- CREATE BUTTON ------------------------->
    <div class="row justify-end q-mb-md">
      <q-btn
        push
        glossy
        @click="prompt = true"
        label="Create"
        style="background-color: #009688;"
        text-color="white"
        class="btnjob_order"
        icon="create"
        stack
      />
    </div>

    <!--------------------- CREATE USER DIALOG ------------------------->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 40%">
        <q-icon
          class="create_icon q-gutter-m"
          size="3em"
          style="color: #009688"
          name="create"
        />
        <q-card-section class="pencil">
          <div class="text-h6">Create</div>
        </q-card-section>

        <q-form class="main" @submit.prevent="submit">
          <!-------------------- FIRST NAME -------------------->
          <div>
            <q-input
              class="name"
              outlined
              bottom-slots
              v-model="form.firstname"
              label="First Name"
              :error="!!form.errors.firstname"
              :error-message="form.errors.firstname"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>

          <!-------------------- LAST NAME -------------------->
          <div>
            <q-input
              class="name"
              outlined
              bottom-slots
              v-model="form.lastname"
              label="Last Name"
              :error="!!form.errors.lastname"
              :error-message="form.errors.lastname"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>

          <!-------------------- USERNAME -------------------->
          <div>
            <q-input
              class="username"
              outlined
              bottom-slots
              v-model="form.username"
              label="Username"
              :error="!!form.errors.username"
              :error-message="form.errors.username"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>

          <!-------------------- DEPARTMENT & ROLE -------------------->
          <div>
            <q-select
              class="dept"
              outlined
              v-model="form.department"
              label="Department"
              :options="[
                'Operations Department',
                'Finance&Admin Department',
                'Marketing Department',
                'IT Department',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="domain" />
              </template>
            </q-select>
            <q-select
              class="user_roles"
              outlined
              v-model="form.user_role"
              label="User Roles"
              emit-value
              map-options
              :options="[
                { label: 'Administrator', value: 1 },
                { label: 'Unit Head', value: 2 },
                { label: 'Supervisor', value: 3 },
                { label: 'Employee', value: 4 },
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="manage_accounts" />
              </template>
            </q-select>
          </div>

          <!-------------------- PASSWORD -------------------->
          <div>
            <q-input
              class="pass"
              v-model="form.password"
              outlined
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              :error="!!form.errors.password"
              :error-message="form.errors.password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input
              class="cpass"
              v-model="form.password_conf"
              outlined
              :type="isPwd ? 'password' : 'text'"
              label="Confirm Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>

          <!----------------------- SAVE & CANCEL --------------------->
          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Save"
              type="submit"
              :loading="form.processing"
            />
            <q-btn flat label="Cancel" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!--------------------- EMPLOYEE TABLE ------------------------->
    <div class="EmpManagement_tbl">
      <q-table
        separator="cell"
        wrap-cells
        :rows="employeeRows"
        style="font-family: inherit"
        :columns="columns"
        row-key="user_number"
        :visible-columns="[
          'user_number',
          'username',
          'full_name',
          'department',
          'role_name',
        ]"
        :rows-per-page-options="[5, 9, 10, 15, 20, 25, 30, 0]"
      >
        <template #body="props">
          <q-tr class="white" :props="props">
            <q-td
              key="user_number"
              class="text-center"
              style="color: black; font-style: inherit; font-size: 14px;"
            >
              {{ props.row.user_number }}
            </q-td>
            <q-td key="username">{{ props.row.username }}</q-td>
            <q-td key="full_name">{{ props.row.full_name }}</q-td>
            <q-td key="department">{{ props.row.department }}</q-td>
            <q-td
              key="role_name"
              class="text-center"
              style="color: black; font-style: inherit;"
            >
              <q-chip>{{ props.row.role_name }}</q-chip>
            </q-td>
          </q-tr>
        </template>

        <template #no-data>
          <div class="full-width row flex-center q-pa-md text-grey">
            No records found.
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';

// Employees are provided as a prop by the Express `/admin/EmployeeManagement` route.
const props = defineProps({
  employees: {
    type: Array,
    default: () => [],
  },
});

const prompt = ref(false);
const isPwd = ref(true);

// Inertia form posts to the JSON API mounted under /api.
const form = useForm({
  firstname: '',
  lastname: '',
  department: null,
  username: '',
  password: '',
  password_conf: '',
  user_role: null,
});

function submit() {
  form.post('/api/add_user', {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
      prompt.value = false;
    },
  });
}

const columns = [
  {
    label: 'EMPLOYEE ID',
    field: 'user_number',
    name: 'user_number',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'USERNAME',
    field: 'username',
    name: 'username',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'NAME',
    field: 'full_name',
    name: 'full_name',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'DEPARTMENT',
    field: 'department',
    name: 'department',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'USER ROLE',
    field: 'role_name',
    name: 'role_name',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
];

const ROLE_NAMES = {
  1: 'Administrator',
  2: 'Unit Head',
  3: 'Supervisor',
  4: 'Employee',
};

// Normalize raw user documents into the flat shape the table expects.
const employeeRows = computed(() =>
  props.employees.map((e) => ({
    user_number: e.user_number,
    username: e.username,
    full_name:
      e.full_name || `${e.firstname || ''} ${e.lastname || ''}`.trim(),
    department: e.department,
    role_name: e.role_name || ROLE_NAMES[e.user_role] || e.user_role,
  }))
);
</script>

<style lang="scss" scoped src="./EmployeeManagement.scss"></style>
