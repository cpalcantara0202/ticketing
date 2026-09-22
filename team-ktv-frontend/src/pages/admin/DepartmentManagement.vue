<template>
  <q-page padding>
    <div class="create_btn1">
      <!--------------------------- CREATE BUTTON ---------------------------->
      <q-btn
        push
        glossy
        color="primary"
        @click="prompt = true"
        style="background-color: #009688;"
        class="btncreate"
      >
        <q-icon class="icon" name="edit" />
        <div class="create">Create</div>
      </q-btn>

      <!--------------------------- CREATE DIALOG ---------------------------->
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 42%">
          <q-icon
            class="create_icon q-gutter-m"
            size="3em"
            style="color: #009688"
            name="create"
          />
          <q-form @submit.prevent="submit">
            <q-card-section class="try">
              <div class="text-h6">CREATE</div>

              <!--------------------- DEPARTMENT NAME --------------------->
              <q-input
                class="dept"
                outlined
                bottom-slots
                v-model="form.department_name"
                label="Department"
                :error="!!form.errors.department_name"
                :error-message="form.errors.department_name"
              >
                <template v-slot:prepend>
                  <q-icon name="domain" />
                </template>
              </q-input>

              <!--------------------- CLUSTER CODE --------------------->
              <q-input
                class="search1 text-white"
                v-model="form.cluster_code"
                label="Cluster Code"
                outlined
                :error="!!form.errors.cluster_code"
                :error-message="form.errors.cluster_code"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-card-section>

            <!--------------------- SAVE & CANCEL --------------------->
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
    </div>

    <!--------------------------- DEPARTMENT TABLE ---------------------------->
    <q-table
      separator="cell"
      wrap-cells
      class="table"
      :rows="departmentRows"
      style="font-family: inherit"
      :columns="columns"
      row-key="department_number"
      :visible-columns="[
        'department_number',
        'department_name',
        'cluster_code',
        'department_status',
      ]"
      :rows-per-page-options="[5, 9, 10, 15, 20, 25, 30, 0]"
    >
      <template #body="props">
        <q-tr class="white" :props="props">
          <q-td
            key="department_number"
            class="text-center"
            style="color: black; font-style: inherit; font-size: 14px;"
          >
            {{ props.row.department_number }}
          </q-td>
          <q-td key="department_name">{{ props.row.department_name }}</q-td>
          <q-td key="cluster_code">{{ props.row.cluster_code }}</q-td>
          <q-td
            key="department_status"
            class="text-center"
            style="color: black; font-style: inherit;"
          >
            {{ props.row.department_status }}
          </q-td>
        </q-tr>
      </template>

      <template #no-data>
        <div class="full-width row flex-center q-pa-md text-grey">
          No records found.
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';

// Departments are provided as a prop by the Express `/admin/DepartmentManagement` route.
const props = defineProps({
  departments: {
    type: Array,
    default: () => [],
  },
});

const prompt = ref(false);

// Inertia form posts to the JSON API mounted under /api.
const form = useForm({
  department_name: '',
  cluster_code: '',
});

function submit() {
  form.post('/api/add_dept', {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
      prompt.value = false;
    },
  });
}

const columns = [
  {
    label: 'DEPARTMENT ID',
    field: 'department_number',
    name: 'department_number',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'DEPARTMENT',
    field: 'department_name',
    name: 'department_name',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'CLUSTER CODE',
    field: 'cluster_code',
    name: 'cluster_code',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
  {
    label: 'STATUS',
    field: 'department_status',
    name: 'department_status',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
  },
];

// Human-readable status label; DB stores '1' active / '0' archived.
const departmentRows = computed(() =>
  props.departments.map((d) => ({
    department_number: d.department_number,
    department_name: d.department_name,
    cluster_code: d.cluster_code,
    department_status:
      String(d.department_status) === '0' ? 'Archived' : 'Active',
  }))
);
</script>

<style lang="scss" scoped src="./DepartmentManagement.scss"></style>
