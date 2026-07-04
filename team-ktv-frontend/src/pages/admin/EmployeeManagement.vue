<template>
     <q-page padding>
        <q-tabs class="check1" v-model="currentTab" narrow-indicator align="right" 
        style="margin-top: 20px;"
        :breakpoint="600" no-caps dense >
             <!-------------------- ACTIVE ------------------------->
      <q-tab label="Active" name="Active" icon="event_available" stack
      class="bg-white text-primary">
        <q-badge color="red" floating>{{ activeUsers.length }}</q-badge>
      </q-tab>
            <!-------------------- ARCHIVE ------------------------->
      <q-tab label="Archive" name="Archive" icon="check_circle_outline" stack
      class="bg-primary text-white">
        <q-badge color="red" floating>{{ archivedUsers.length }}</q-badge>
      </q-tab>
  <!--------------------CREATE BUTTON ------------------------->
  <q-btn push glossy @click="openCreateDialog" label="Create"
        style="background-color: #009688; margin-left: 20px; margin-right: 20px;" 
        text-color="white" class="btnjob_order" 
        icon="create" stack>
  </q-btn> 

      <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 40%">
        <q-icon class="create_icon q-gutter-m" size="3em" 
           style="color: #009688" name="create" />
        <q-card-section class="pencil">
          <div class="text-h6">Create</div>
      </q-card-section>
        
  <!-------------------- FIRSTNAME INPUT ------------------------->

    <q-form class="main" :breakpoint="600">
      <div>
        <q-input class="name" outlined bottom-slots v-model="form.firstname" label="First Name" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>

  <!-------------------- LASTNAME INPUT ------------------------->

      <div>
        <q-input class="name" outlined bottom-slots v-model="form.lastname" label="Last Name" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>

        <!-------------------- USERNAME INPUT ------------------------->

      <div>
        <q-input class="username" outlined bottom-slots v-model="form.username" label="Username" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>
        <!-------------------- DROPDOWN DEPT & USER ROLES ------------------------->

      <div>
        <q-select class="dept" outlined v-model="form.department" label="Department" :options="departmentOptions" >
        <template v-slot:prepend>
          <q-icon name="domain" />
        </template>
      </q-select>
      <q-select class="user_roles" outlined v-model="form.user_role" label="User Roles" :options="roleOptions" emit-value map-options>
        <template v-slot:prepend>
          <q-icon name="manage_accounts" />
        </template>
      </q-select>
      </div>
              <!-------------------- PASSWORD ------------------------->

      <div>
        <q-input class="pass" v-model="form.password" outlined :type="isPwd ? 'password' : 'text'" label="Password">
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
      <q-input class="cpass" v-model="form.password_conf" outlined :type="isPwd ? 'password' : 'text'" label="Confirm Password">
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
       <!-----------------------Save and Cancel--------------------->

  <q-card-actions align="right" class="text-primary">
    <q-btn flat label="Save" @click="saveUser" :loading="saving" />
    <q-btn flat label="Cancel" @click="cancelCreate" />
  </q-card-actions>   
  
</q-form>
                 

    </q-card>
  </q-dialog>
</q-tabs>
      
        

         <!--Tab Panel for Active----------------------------------->
<q-tab-panels v-model="currentTab"> 
    <q-tab-panel name="Active" class="EmpManagement_tbl">
        <q-table separator="cell" wrap-cells 
        :rows="activeUsers"
        :loading="loading"
        style="font-family: inherit"
        :columns="tableColumns"
        row-key="user_number"
        :visible-columns="['user_number', 'username', 'full_name', 'department', 'role_name']"
        :rows-per-page-options="[5,9,10,15,20,25,30,0]"
    >
            <template #body="props">
              <q-tr class="white" :props="props">
                <q-td key="user_number" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.user_number }}
                </q-td>
                <q-td key="username">
                  {{ props.row.username }}
                </q-td>
                <q-td key="full_name">
                  {{ props.row.full_name }}
                </q-td>
                <q-td key="department">
                  {{ props.row.department }}
                </q-td>
                <q-td key="role_name" class="text-center" style="color: black; font-style: inherit;">
                  <q-chip>{{ props.row.role_name }}</q-chip>
                </q-td>
              </q-tr>
            </template>
          </q-table>
      </q-tab-panel>

        <!--------------------------- ARCHIVE TAB ------------------------------->

    <q-tab-panel name="Archive" class="EmpManagement_tbl">
        <q-table separator="cell" wrap-cells 
        :rows="archivedUsers"
        :loading="loading"
        style="font-family: inherit"
        :columns="tableColumns"
        row-key="user_number"
        :visible-columns="['user_number', 'username', 'full_name', 'department', 'role_name']"
        :rows-per-page-options="[5,9,10,15,20,25,30,0]"
    >
            <template #body="props">
              <q-tr class="white" :props="props">
                <q-td key="user_number" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.user_number }}
                </q-td>
                <q-td key="username">
                  {{ props.row.username }}
                </q-td>
                <q-td key="full_name">
                  {{ props.row.full_name }}
                </q-td>
                <q-td key="department">
                  {{ props.row.department }}
                </q-td>
                <q-td key="role_name" class="text-center" style="color: black; font-style: inherit;">
                  <q-chip>{{ props.row.role_name }}</q-chip>
                </q-td>
              </q-tr>
            </template>
          </q-table>
      </q-tab-panel>
</q-tab-panels>

    <!-- Success/Error notifications -->
    <q-dialog v-model="showMessage">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ messageTitle }}</div>
        </q-card-section>
        <q-card-section>{{ messageText }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

     </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:4001'

const currentTab = ref('Active')
const prompt = ref(false)
const isPwd = ref(true)
const dense = ref(false)
const loading = ref(false)
const saving = ref(false)
const showMessage = ref(false)
const messageTitle = ref('')
const messageText = ref('')

const activeUsers = ref([])
const archivedUsers = ref([])

const departmentOptions = ['Operations Department', 'Finance&Admin Department', 'Marketing Department', 'IT Department']
const roleOptions = [
  { label: 'Administrator', value: 1 },
  { label: 'Unit Head', value: 2 },
  { label: 'Rank and File', value: 3 }
]

const tableColumns = [
  {
    label: 'EMPLOYEE ID',
    field: 'user_number',
    name: 'user_number',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'USERNAME',
    field: 'username',
    name: 'username',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'NAME',
    field: 'full_name',
    name: 'full_name',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'DEPARTMENT',
    field: 'department',
    name: 'department',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  },
  {
    label: 'USER ROLE',
    field: 'role_name',
    name: 'role_name',
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em'
  }
]

const form = ref({
  firstname: '',
  lastname: '',
  username: '',
  department: '',
  user_role: null,
  password: '',
  password_conf: ''
})

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'logged_in_user': localStorage.getItem('logged_in_user') || ''
  }
}

function openCreateDialog() {
  resetForm()
  prompt.value = true
}

function resetForm() {
  form.value = {
    firstname: '',
    lastname: '',
    username: '',
    department: '',
    user_role: null,
    password: '',
    password_conf: ''
  }
}

function cancelCreate() {
  prompt.value = false
  resetForm()
}

async function saveUser() {
  saving.value = true
  try {
    const res = await fetch(`${API_URL}/add_user`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    if (data.status === 'success') {
      prompt.value = false
      resetForm()
      messageTitle.value = 'Success'
      messageText.value = data.response_data || 'User created successfully!'
      showMessage.value = true
      fetchUsers()
    } else {
      messageTitle.value = 'Error'
      messageText.value = data.message || 'Failed to create user.'
      showMessage.value = true
    }
  } catch (err) {
    messageTitle.value = 'Error'
    messageText.value = 'Network error. Make sure the backend is running.'
    showMessage.value = true
  }
  saving.value = false
}

async function fetchUsers() {
  loading.value = true
  try {
    const [activeRes, archivedRes] = await Promise.all([
      fetch(`${API_URL}/get_activeuser`, { headers: getHeaders() }),
      fetch(`${API_URL}/get_archiveduser`, { headers: getHeaders() })
    ])
    const activeData = await activeRes.json()
    const archivedData = await archivedRes.json()

    if (activeData.status === 'success') {
      activeUsers.value = activeData.response_data || []
    }
    if (archivedData.status === 'success') {
      archivedUsers.value = archivedData.response_data || []
    }
  } catch (err) {
    console.error('Error fetching users:', err)
  }
  loading.value = false
}

onMounted(() => {
  fetchUsers()
})
</script>

<style lang="scss" scoped src="./EmployeeManagement.scss"></style>
