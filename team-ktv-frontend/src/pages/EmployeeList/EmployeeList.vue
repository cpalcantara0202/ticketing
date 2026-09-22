<template>
  <q-page padding>
    <TicketTable
      :rows="employeeRows"
      :columns="columns"
      row-key="user_number"
      class="table"
    />
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import TicketTable from 'components/TicketTable.vue';

// Employees are provided as a prop by the Express `/EmployeeList` route.
const props = defineProps({
  employees: {
    type: Array,
    default: () => [],
  },
});

const columns = [
  { label: 'EMPLOYEE ID', field: 'user_number' },
  { label: 'USERNAME', field: 'username' },
  { label: 'NAME', field: 'full_name' },
  { label: 'DEPARTMENT', field: 'department' },
  { label: 'ROLE', field: 'role_name' },
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

<style lang="scss" scoped src="./EmployeeList.scss"></style>
