<template>
     <q-page padding>
        <q-tabs class="check1" v-model="currentTab" narrow-indicator align="right" 
        style="margin-top: 20px;"
        :breakpoint="600" no-caps dense >
             <!-------------------- ACTIVE ------------------------->
      <q-tab label="Active" name="Active" icon="event_available" stack
      class="bg-white text-primary">
        <q-badge color="red" floating>1</q-badge>
      </q-tab>
            <!-------------------- ARCHIVE ------------------------->
      <q-tab label="Archive" name="Archive" icon="check_circle_outline" stack
      class="bg-primary text-white">
        <q-badge color="red" floating>10</q-badge>
      </q-tab>
  <!--------------------CREATE BUTTON ------------------------->
  <q-btn v-model="model" push glossy @click="prompt = true" label="Create"
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
        
  <!-------------------- NAME IMPUT ------------------------->

    <q-form class="main" :breakpoint="600">
      <div>
        <q-input class="name" outlined bottom-slots v-model="text" label="Name" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>   
        <!-------------------- EMAIL INPUT ------------------------->

      <div>
        <q-input class="username" outlined bottom-slots v-model="text" label="Username" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>
        <!-------------------- DROPDOWN DEPT & USER ROLES ------------------------->

      <div>
        <q-select class="dept" outlined v-model="selection" label="Department" :options="['Operations Department', 'Finance&Admin Department', 'Marketing Department', 'IT Department']" >
        <template v-slot:prepend>
          <q-icon name="domain" />
        </template>
      </q-select>
      <q-select  class="user_roles" outlined v-model="selection1" label="User Roles" :options="['Administrator', 'Department Head', 'Unit Head', 'Supervisor', 'Employee']" >
        <template v-slot:prepend>
          <q-icon name="manage_accounts" />
        </template>
      </q-select>
      </div>
              <!-------------------- PASSWORD ------------------------->

      <div>
        <q-input class="pass" v-model="password" outlined :type="isPwd ? 'password' : 'password'" label="Password">
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
      <q-input class="cpass" v-model="password" outlined :type="isPwd ? 'password' : 'password'" label="Confirm Password">
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
    <q-btn  flat label="Save" v-close-popup  />
      <q-btn  flat label="Cancel" v-close-popup  />
  </q-card-actions>   
  
</q-form>
                 

    </q-card>
  </q-dialog>
</q-tabs>
      
        

         <!--Tab Panel for my task, submit, review----------------------------------->
<q-tab-panels v-model="currentTab"> 
    <q-tab-panel name="Active" class="EmpManagement_tbl">
        <q-table  separator="cell" wrap-cells 
        :rows="[
        { 
        Employee_ID:'001',
        Username:'caryapeladas@gmail.com',
        Name:'Caryl Apeladas',
        Department:'Marketing Department',
        User_Role:'Admin',  
       },
       { 
        Employee_ID:'002',
        Username:'joana@gmail.com',
        Name:'Joana Belgica',
        Department:'Admin&Finance Department',
        User_Role:'Employee',  
       },
       { 
        Employee_ID:'003',
        Username:'caryapeladas@gmail.com',
        Name:'Caryl Apeladas',
        Department:'Marketing Department',
        User_Role:'Admin',  
       },
       { 
        Employee_ID:'004',
        Username:'joana@gmail.com',
        Name:'Joana Belgica',
        Department:'Admin&Finance Department',
        User_Role:'Employee',  
       },
       
      
    ]"
    style="font-family: inherit"
    :columns="[
          {
            label: 'EMPLOYEE ID',          
            field: 'Employee_ID',
            name:  'Employee_ID',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'

            
          },
          {
            label: 'USERNAME',
            field: 'Username',
            name:  'Username',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'

          },
          {
            label: 'NAME',
            field: 'Name',
            name:  'Name',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'

          },
          {
            label: 'DEPARTMENT',
            field: 'Department',
            name:  'Department',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'
           
          },
          {
            label: 'USER ROLE',
            field: 'User_Role',
            name:  'User_Role',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size:1em'
          }
          
    ]"
            row-key="Ticket_ID"
            :visible-columns="['Employee_ID', 'Username', 'Name', 'Department', 'User_Role']"
            :rows-per-page-options="[5,9,10,15,20,25,30,0]"
    >
            <template #body="props">
              <q-tr class="white" :props="props">
                <q-td key="Employee_ID" class="text-center" style="color: black; font-style: inherit; 
                font-size: 14px;" >
                  {{ props.row.Employee_ID }}
                </q-td>
                <q-td key="Username" >
                  {{ props.row.Username }}
                </q-td>
                <q-td key="Name" >
                  {{ props.row.Name }}
                </q-td>
                <q-td key="Department">
                  {{ props.row.Department }}
                </q-td>
                <q-td key="User_Role" class="text-center" style="color: black; font-style: inherit;">
                  <q-chip>{{ props.row.User_Role }}</q-chip>
                </q-td>
              </q-tr>
            </template>
          </q-table>
      </q-tab-panel>
</q-tab-panels>

        <!--------------------------- ARCHIVE TAB ------------------------------->

<q-tab-panels v-model="currentTab"> 
    <q-tab-panel name="Archive" class="EmpManagement_tbl">
        <q-table  separator="cell" wrap-cells 
        :rows="[
        { 
        Employee_ID:'001',
        Username:'legardee@gmail.com',
        Name:'Elizabeth Legarde',
        Department:'Marketing Department',
        User_Role:'Admin',  
       },
       { 
        Employee_ID:'002',
        Username:'alcantara@gmail.com',
        Name:'Christian Alcantara',
        Department:'Admin&Finance Department',
        User_Role:'Employee',  
       },
       { 
        Employee_ID:'003',
        Username:'caryapeladas@gmail.com',
        Name:'Caryl Apeladas',
        Department:'Marketing Department',
        User_Role:'Admin',  
       },
       { 
        Employee_ID:'004',
        Username:'joana@gmail.com',
        Name:'Joana Belgica',
        Department:'Admin&Finance Department',
        User_Role:'Employee',  
       },
       
      
    ]"
    style="font-family: inherit"
    :columns="[
          {
            label: 'EMPLOYEE ID',          
            field: 'Employee_ID',
            name:  'Employee_ID',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'

            
          },
          {
            label: 'USERNAME',
            field: 'Username',
            name:  'Username',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'

          },
          {
            label: 'NAME',
            field: 'Name',
            name:  'Name',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'

          },
          {
            label: 'DEPARTMENT',
            field: 'Department',
            name:  'Department',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size: 1em'
           
          },
          {
            label: 'USER ROLE',
            field: 'User_Role',
            name:  'User_Role',
            align:'center',
            headerClasses: 'bg-teal-7 text-white',
            headerStyle: 'font-size:1em'
          }
          
    ]"
            row-key="Ticket_ID"
            :visible-columns="['Employee_ID', 'Username', 'Name', 'Department', 'User_Role']"
            :rows-per-page-options="[5,9,10,15,20,25,30,0]"
    >
            <template #body="props">
              <q-tr class="white" :props="props">
                <q-td key="Employee_ID" class="text-center" style="color: black; font-style: inherit; 
                font-size: 14px;" >
                  {{ props.row.Employee_ID }}
                </q-td>
                <q-td key="Username" >
                  {{ props.row.Username }}
                </q-td>
                <q-td key="Name" >
                  {{ props.row.Name }}
                </q-td>
                <q-td key="Department">
                  {{ props.row.Department }}
                </q-td>
                <q-td key="User_Role" class="text-center" style="color: black; font-style: inherit;">
                  <q-chip>{{ props.row.User_Role }}</q-chip>
                </q-td>
              </q-tr>
            </template>
          </q-table>
      </q-tab-panel>
</q-tab-panels>

     </q-page>
</template>

<script setup>
import { ref } from 'vue'
const currentTab = ref('Active')
const selection = ref()
const selection1 = ref()
</script>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      password: ref(''),
      isPwd: ref(true),
    }
  }
}
</script>

<style lang="scss" scoped src="./EmployeeManagement.scss"></style>