<template>
    <q-page>
    <div class="create_btn1">
<!---------------------------  CREATE BUTTON  ---------------------------->
    <q-btn push glossy color="primary" @click="prompt = true" 
     style="background-color: #1976D2;" class="btncreate"> 
    <q-icon class="icon" name="edit"   />
    <div class="create">Create</div>
    </q-btn>
<!---------------------------  INSIDE CREATE BUTTON  ---------------------------->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 42%">
        <q-icon class="create_icon q-gutter-m" size="3em" 
           style="color: #1976D2" name="create" />
        <q-card-section class="try">
          <div class="text-h6">CREATE</div>

<!---------------------------  DEPARTMENT INPUT ---------------------------->

          <q-input class="dept" outlined bottom-slots v-model="text" label="Department" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="domain" />
          </template>
        </q-input>
<!---------------------------  SEARCH BAR  ---------------------------->

        <q-input class="search1 text-white" v-model="search" label="Unit Head" outlined type="search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
        </q-card-section>
    <!---------------------------  SAVE & CANCEL BUTTON  ---------------------------->

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Save" v-close-popup />
          <q-btn flat label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
    <!---------------------------  active table  ---------------------------->

      <q-table  separator="cell" wrap-cells class="table"
    :rows="[
    { 
    Department_ID:'001',
    Department:'Operations Department',
    Unit_Head:'Caryl Apeladas',
    No_Of_Employee:'50',
    Status:'Active'
  },
  { 
    Department_ID:'002',
    Department:'Finance&Admin Department',
    Unit_Head:'Joana Belgica',
    No_Of_Employee:'50',
    Status:'Active'
  },
  { 
    Department_ID:'003',
    Department:'Marketing Department',
    Unit_Head:'Elizabeth Legarde',
    No_Of_Employee:'50',
    Status:'Active'
  },
  { 
    Department_ID:'004',
    Department:'IT Department',
    Unit_Head:'Christian Alcantara',
    No_Of_Employee:'50',
    Status:'Active'
  },
  
  ]"
  style="font-family: inherit"
  :columns="[
      {
        label: 'DEPARTMENT ID',          
        field: 'Department_ID',
        name:  'Department_ID',
        align:'center',
        headerClasses: 'bg-blue-7 text-white',
        headerStyle: 'font-size: 1em'
  
        
      },
      {
        label: 'DEPARTMENT',
        field: 'Department',
        name:  'Department',
        align:'center',
        headerClasses: 'bg-blue-7 text-white',
        headerStyle: 'font-size: 1em'
  
      },
      {
        label: 'UNIT HEAD',
        field: 'Unit_Head',
        name:  'Unit_Head',
        align:'center',
        headerClasses: 'bg-blue-7 text-white',
        headerStyle: 'font-size: 1em'
  
      },
      {
        label: 'NO. OF EMPLOYEE ',
        field: 'No_Of_Employee',
        name:  'No_Of_Employee',
        align:'center',
        headerClasses: 'bg-blue-7 text-white',
        headerStyle: 'font-size: 1em'
       
      },
      {
        label: 'STATUS',
        field: 'Status',
        name:  'Status',
        align:'center',
        headerClasses: 'bg-blue-7 text-white',
        headerStyle: 'font-size: 1em'
      
      },
      
  ]"
        row-key="Ticket_ID"
        :visible-columns="['Department_ID', 'Department', 'Unit_Head', 'No_Of_Employee', 'Status']"
        :rows-per-page-options="[5,9,10,15,20,25,30,0]"
  >
        <template #body="props">
          <q-tr class="white" :props="props">
            <q-td key="Department_ID" class="text-center" style="color: black; font-style: inherit; 
            font-size: 14px;" >
              {{ props.row.Department_ID }}
            </q-td>
            <q-td key="Department" >
              {{ props.row.Department }}
            </q-td>
            <q-td key="Unit_Head" >
              {{ props.row.Unit_Head }}
            </q-td>
            <q-td key="No_Of_Employee" class="text-center" style="color: black; font-style: inherit;">
              {{ props.row.No_Of_Employee }}
            </q-td>
            <q-td key="Status" class="text-center" style="color: black; font-style: inherit;">
              {{ props.row.Status }}
            </q-td>
          </q-tr>
        </template>  
      </q-table>
    </q-page>
  </template>
      
  
  <script>
  import { ref } from 'vue';
  export default {
  setup () {
    return {
      prompt: ref(false),
      search: ref('')
    }
  }
}
  </script> 
  
  <style lang="scss" scoped src="./DepartmentManagement.scss"></style>