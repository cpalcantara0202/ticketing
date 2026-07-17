<template>
  <q-page>
    <div class="create_btn1">
      <!---------------------------  CREATE BUTTON  ---------------------------->
      <q-btn push glossy color="primary" @click="prompt = true"
        style="background-color: #009688;" class="btncreate">
        <q-icon class="icon" name="edit" />
        <div class="create">Create</div>
      </q-btn>

      <!---------------------------  CREATE DIALOG  ---------------------------->
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 42%">
          <q-icon class="create_icon q-gutter-m" size="3em"
            style="color: #009688" name="create" />
          <q-card-section class="try">
            <div class="text-h6">CREATE DEPARTMENT</div>

            <!---------------------------  CLUSTER CODE INPUT ---------------------------->
            <q-input class="dept" outlined bottom-slots v-model="form.cluster_code" label="Cluster Code" :dense="dense">
              <template v-slot:prepend>
                <q-icon name="code" />
              </template>
            </q-input>

            <!---------------------------  DEPARTMENT NAME INPUT ---------------------------->
            <q-input class="dept" outlined bottom-slots v-model="form.department_name" label="Department Name" :dense="dense">
              <template v-slot:prepend>
                <q-icon name="domain" />
              </template>
            </q-input>
          </q-card-section>

          <!---------------------------  SAVE & CANCEL BUTTON  ---------------------------->
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Save" @click="saveDepartment" :loading="saving" />
            <q-btn flat label="Cancel" v-close-popup @click="resetForm" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!---------------------------  DEPARTMENT TABLE  ---------------------------->
    <q-table separator="cell" wrap-cells class="table"
      :rows="departments"
      :columns="tableColumns"
      :loading="loading"
      style="font-family: inherit"
      row-key="department_number"
      :rows-per-page-options="[5, 9, 10, 15, 20, 25, 30, 0]"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="department_number" class="text-center" style="color: black; font-size: 14px;">
            {{ props.row.department_number }}
          </q-td>
          <q-td key="cluster_code" class="text-center" style="color: black; font-size: 14px;">
            {{ props.row.cluster_code }}
          </q-td>
          <q-td key="department_name" class="text-center" style="color: black; font-size: 14px;">
            {{ props.row.department_name }}
          </q-td>
          <q-td key="department_status" class="text-center" style="color: black; font-size: 14px;">
            <q-badge :color="props.row.department_status === '1' ? 'green' : 'red'">
              {{ props.row.department_status === '1' ? 'Active' : 'Archived' }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!---------------------------  MESSAGE DIALOG  ---------------------------->
    <q-dialog v-model="showMessage">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ messageTitle }}</div>
        </q-card-section>
        <q-card-section>
          {{ messageText }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:4001'

const prompt = ref(false)
const dense = ref(false)
const loading = ref(false)
const saving = ref(false)
const showMessage = ref(false)
const messageTitle = ref('')
const messageText = ref('')

const departments = ref([])

const tableColumns = [
  {
    label: 'DEPARTMENT ID',
    field: 'department_number',
    name: 'department_number',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'CLUSTER CODE',
    field: 'cluster_code',
    name: 'cluster_code',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'DEPARTMENT NAME',
    field: 'department_name',
    name: 'department_name',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'STATUS',
    field: 'department_status',
    name: 'department_status',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  }
]

const form = ref({
  cluster_code: '',
  department_name: ''
})

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'logged_in_user': localStorage.getItem('logged_in_user') || ''
  }
}

function resetForm() {
  form.value = {
    cluster_code: '',
    department_name: ''
  }
}

async function saveDepartment() {
  saving.value = true
  try {
    const res = await fetch(`${API_URL}/add_dept`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    if (data.status === 'success') {
      prompt.value = false
      resetForm()
      messageTitle.value = 'Success'
      messageText.value = 'Department created successfully!'
      showMessage.value = true
      fetchDepartments()
    } else {
      messageTitle.value = 'Error'
      messageText.value = data.message || 'Failed to create department.'
      showMessage.value = true
    }
  } catch (err) {
    messageTitle.value = 'Error'
    messageText.value = 'Network error. Make sure the backend is running.'
    showMessage.value = true
  }
  saving.value = false
}

async function fetchDepartments() {
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/getAllDept`, {
      headers: getHeaders()
    })
    const data = await res.json()
    if (data.status === 'success') {
      departments.value = data.response_data || []
    }
  } catch (err) {
    console.error('Error fetching departments:', err)
  }
  loading.value = false
}

onMounted(() => {
  fetchDepartments()
})
</script>

<style lang="scss" scoped src="./DepartmentManagement.scss"></style>
