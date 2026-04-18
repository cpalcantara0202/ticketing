<template>
    <q-page 
    >
    <q-tabs class="check1" v-model="currentTab" align="right" :breakpoint="600" no-caps dense>
                    <!-------------------- ONGOING ------------------------->

        <q-tab label="Ongoing" name="Ongoing" icon="sync" stack
        class="bg-white text-primary">
             <q-badge color="red" floating>5</q-badge>
        </q-tab> 
                    <!-------------------- FOR APPROVAL ------------------------->

        <q-tab label="For Approval" name="ForApproval" icon="approval" stack
        class="bg-primary text-white">
            <q-badge color="red" floating>12</q-badge>
        </q-tab> 
                    <!-------------------- FOR REVIEW ------------------------->

        <q-tab label="For Review" name="ForReview" icon="rate_review" stack
        class="bg-white text-primary">
            <q-badge color="red" floating>1</q-badge>
        </q-tab>
                    <!-------------------- DONE ------------------------->

        <q-tab label="Done" name="Done" icon="task" stack
        class="bg-primary text-white">
            <q-badge color="red" floating>20</q-badge>
        </q-tab> 
    </q-tabs>

    <q-tab-panels v-model="currentTab">

<!-----------------------Ongoing Table--------------------->

<q-tab-panel name="Ongoing" class="tasklist_tbl">
  <q-table  separator="cell" wrap-cells dense
  :rows="[
  { 
  Ticket_ID:'001',
  Subject:'Internet Problems',
  Category:'Incident Report',
  Created_By:'panda@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
{
  Ticket_ID:'002',
  Subject:'Room Cleaning',
  Category:'Service Request',
  Created_By:'cat@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
{
  Ticket_ID:'003',
  Subject:'Bills Payment',
  Category:'Routine',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
{
  Ticket_ID:'001',
  Subject:'Internet Problem',
  Category:'Incident Report',
  Created_By:'panda@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
{
  Ticket_ID:'002',
  Subject:'Room Cleaning',
  Category:'Service Request',
  Created_By:'cat@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
{
  Ticket_ID:'003',
  Subject:'Bills Payment',
  Category:'Routine',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
{
  Ticket_ID:'003',
  Subject:'Development',
  Category:'Project',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Assign_Date:'2023-07-11'
},
]"
style="font-family: inherit"
:columns="[
    {
      label: 'TICKET ID',          
      field: 'Ticket_ID',
      name:  'Ticket_ID',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

      
    },
    {
      label: 'SUBJECT',
      field: 'Subject',
      name:  'Subject',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'CATEGORY',
      field: 'Category',
      name:  'Category',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'CREATED BY',
      field: 'Created_By',
      name:  'Created_By',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'CREATED DATE',
      field: 'Created_Date',
      name:  'Created_Date',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'PRIORITY',
      field: 'Priority',
      name:  'Priority',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'ASSIGNEE',
      field: 'Assignee',
      name:  'Assignee',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'ASSIGNED BY',
      field: 'Assigned_By',
      name:  'Assigned_By',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'ASSIGN DATE',
      field: 'Assign_Date',
      name:  'Assign_Date',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
    }
]"
      row-key="Ticket_ID"
      :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_By', 'Created_Date', 'Priority', 'Assignee', 'Assigned_By', 'Assign_Date']"
      :rows-per-page-options="[5,9,10,15,20,25,30,0]"
>
      <template #body="props">
        <q-tr class="white" :props="props">
          <q-td key="Ticket_ID" class="text-center" style="color: black; font-style: inherit; 
          font-size: 14px;" >
            {{ props.row.Ticket_ID }}
          </q-td>
          <q-td key="Subject" >
            {{ props.row.Subject }}
          </q-td>
          <q-td key="Category" >
            {{ props.row.Category }}
          </q-td>
          <q-td key="Created_By">
            {{ props.row.Created_By }}
          </q-td>
          <q-td key="Created_Date">
            {{ props.row.Created_Date }}
          </q-td>
          <q-td key="Priority" class="text-center" style="color: black; font-style: inherit;">
            <q-chip>{{ props.row.Priority }}</q-chip>
          </q-td>
          <q-td key="Assignee">
            {{ props.row.Assignee }}
          </q-td>
          <q-td key="Assigned_By">
            {{ props.row.Assigned_By }}
          </q-td>
          <q-td key="Assign_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
            {{ props.row.Assign_Date }}
          </q-td>
        </q-tr>
      </template>
    
    
    </q-table>
</q-tab-panel>

<!-----------------------For Approval Table--------------------->

<q-tab-panel name="ForApproval" class="tasklist_tbl">
      <q-table separator="cell" wrap-cells 
      :rows="[
        {
          Ticket_ID:'001',
          Subject:'Internet Problem',
          Category:'Incident Report',
          Created_By:'Caryl Apeladas',
          Created_Date:'2023-07-11',
          Priority:'Low Priority',
        },
        {
          Ticket_ID:'002',
          Subject:'Internet Problem',
          Category:'Incident Report',
          Created_By:'Caryl Apeladas',
          Created_Date:'2023-07-11',
          Priority:'High Priority',
          
        },
        {
          Ticket_ID:'003',
          Subject:'Internet Problem',
          Category:'Incident Report',
          Created_By:'Caryl Apeladas',
          Created_Date:'2023-07-11',
          Priority:'Low Priority',
        },
        {
          Ticket_ID:'002',
          Subject:'Internet Problem',
          Category:'Incident Report',
          Created_By:'Caryl Apeladas',
          Created_Date:'2023-07-11',
          Priority:'High Priority'
        },
        {
          Ticket_ID:'003',
          Subject:'Internet Problem',
          Category:'Incident Report',
          Created_By:'Caryl Apeladas',
          Created_Date:'2023-07-11',
          Priority:'Low Priority',
          
        }
      ]"
      style="font-family: inherit"
      :columns="[
        {
          label: 'TICKET ID',
          field: 'Ticket_ID',
          name:  'Ticket_ID',
          align:'center',
          headerClasses: 'bg-blue-7 text-white',
          headerStyle: 'font-size: 1em'
          
        },
        {
          label: 'SUBJECT',
          field: 'Subject',
          name:  'Subject',
          align: 'center',
          headerClasses: 'bg-blue-7 text-white',
          headerStyle: 'font-size: 1em'
        },
        {
          label: 'CATEGORY',
          field: 'Category',
          name:  'Category',
          align: 'center',
          headerClasses: 'bg-blue-7 text-white',
          headerStyle: 'font-size: 1em'
        },
        {
          label: 'CREATED BY',
          field: 'Created_By',
          name:  'Created_By',
          align: 'center',
          headerClasses: 'bg-blue-7 text-white',
          headerStyle: 'font-size: 1em'
        },
        {
          label: 'CREATED DATE',
          field: 'Created_Date',
          name:  'Created_Date',
          align: 'center',
          headerClasses: 'bg-blue-7 text-white',
          headerStyle: 'font-size: 1em'
        },
        {
          label: 'PRIORITY',
          field: 'Priority',
          name:  'Priority',
          align: 'center',
          headerClasses: 'bg-blue-7 text-white',
          headerStyle: 'font-size: 1em'
        },
      ]" 
          row-key="Ticket_ID"
          :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_By', 'Created_Date','Priority']"
          :rows-per-page-options="[5,9,10,15,20,25,30,0]"
  >
          <template #body="props">
            <q-tr class="white" :props="props">
              <q-td key="Ticket_ID" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                {{ props.row.Ticket_ID }}
              </q-td>
              <q-td key="Subject">
                {{ props.row.Subject }}
              </q-td>
              <q-td key="Category">
                {{ props.row.Category }}
              </q-td>
              <q-td key="Created_By">
                {{ props.row.Created_By }}
              </q-td>
              <q-td key="Created_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                {{ props.row.Created_Date }}
              </q-td>
              <q-td key="Priority" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                <q-chip>{{ props.row.Priority }}</q-chip>
              </q-td>
            </q-tr>
          </template>
        
        
        </q-table>

    </q-tab-panel>

    
<!-----------------------For Review Table--------------------->

<q-tab-panel name="ForReview" class="tasklist_tbl">
  <q-table  separator="cell" wrap-cells dense
  :rows="[
  { 
  Ticket_ID:'001',
  Subject:'Internet Problems',
  Category:'Incident Report',
  Created_By:'panda@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Completed_Date:'2023-07-11'
},
{
  Ticket_ID:'002',
  Subject:'Room Cleaning',
  Category:'Service Request',
  Created_By:'cat@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11'
},
{
  Ticket_ID:'003',
  Subject:'Bills Payment',
  Category:'Routine',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11'
},
{
  Ticket_ID:'001',
  Subject:'Internet Problem',
  Category:'Incident Report',
  Created_By:'panda@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11'
},
{
  Ticket_ID:'002',
  Subject:'Room Cleaning',
  Category:'Service Request',
  Created_By:'cat@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11'
},
{
  Ticket_ID:'003',
  Subject:'Bills Payment',
  Category:'Routine',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11'
},
{
  Ticket_ID:'003',
  Subject:'Development',
  Category:'Project',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11'
},
]"
style="font-family: inherit"
:columns="[
    {
      label: 'TICKET ID',          
      field: 'Ticket_ID',
      name:  'Ticket_ID',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

      
    },
    {
      label: 'SUBJECT',
      field: 'Subject',
      name:  'Subject',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'CATEGORY',
      field: 'Category',
      name:  'Category',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'CREATED BY',
      field: 'Created_By',
      name:  'Created_By',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'CREATED DATE',
      field: 'Created_Date',
      name:  'Created_Date',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'PRIORITY',
      field: 'Priority',
      name:  'Priority',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'ASSIGNEE',
      field: 'Assignee',
      name:  'Assignee',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'COMPLETED DATE',
      field: 'Completed_Date',
      name:  'Completed_Date',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    
]"
      row-key="Ticket_ID"
      :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_By', 'Created_Date', 'Priority', 'Assignee', 'Completed_Date']"
      :rows-per-page-options="[5,9,10,15,20,25,30,0]"
>
      <template #body="props">
        <q-tr class="white" :props="props">
          <q-td key="Ticket_ID" class="text-center" style="color: black; font-style: inherit; 
          font-size: 14px;" >
            {{ props.row.Ticket_ID }}
          </q-td>
          <q-td key="Subject" >
            {{ props.row.Subject }}
          </q-td>
          <q-td key="Category" >
            {{ props.row.Category }}
          </q-td>
          <q-td key="Created_By">
            {{ props.row.Created_By }}
          </q-td>
          <q-td key="Created_Date" class="text-center" style="color: black; font-style: inherit;">
            {{ props.row.Created_Date }}
          </q-td>
          <q-td key="Priority" class="text-center" style="color: black; font-style: inherit;">
            <q-chip>{{ props.row.Priority }}</q-chip>
          </q-td>
          <q-td key="Assignee">
            {{ props.row.Assignee }}
          </q-td>
          <q-td key="Completed_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
            {{ props.row.Completed_Date }}
          </q-td>
        </q-tr>
      </template>  
    </q-table>
</q-tab-panel>
<!-----------------------Done Table--------------------->

<q-tab-panel name="Done" class="tasklist_tbl">
  <q-table  separator="cell" wrap-cells dense
  :rows="[
  { 
  Ticket_ID:'001',
  Subject:'Internet Problems',
  Category:'Incident Report',
  Created_By:'panda@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
{
  Ticket_ID:'002',
  Subject:'Room Cleaning',
  Category:'Service Request',
  Created_By:'cat@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
{
  Ticket_ID:'003',
  Subject:'Bills Payment',
  Category:'Routine',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
{
  Ticket_ID:'001',
  Subject:'Internet Problem',
  Category:'Incident Report',
  Created_By:'panda@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
{
  Ticket_ID:'002',
  Subject:'Room Cleaning',
  Category:'Service Request',
  Created_By:'cat@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
{
  Ticket_ID:'003',
  Subject:'Bills Payment',
  Category:'Routine',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
{
  Ticket_ID:'003',
  Subject:'Development',
  Category:'Project',
  Created_By:'dog@gmail.com',
  Created_Date:'07-08-2023',
  Priority:'Low Priority',
  Assignee:'Joana Belgica',
  Assigned_By:'Caryl Apeladas',
  Completed_Date:'2023-07-11',
  Rate:'5.0'
},
]"
style="font-family: inherit"
:columns="[
    {
      label: 'TICKET ID',          
      field: 'Ticket_ID',
      name:  'Ticket_ID',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

      
    },
    {
      label: 'SUBJECT',
      field: 'Subject',
      name:  'Subject',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'CATEGORY',
      field: 'Category',
      name:  'Category',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'CREATED BY',
      field: 'Created_By',
      name:  'Created_By',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'CREATED DATE',
      field: 'Created_Date',
      name:  'Created_Date',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'PRIORITY',
      field: 'Priority',
      name:  'Priority',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'ASSIGNEE',
      field: 'Assignee',
      name:  'Assignee',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'COMPLETED DATE',
      field: 'Completed_Date',
      name:  'Completed_Date',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    {
      label: 'RATE',
      field: 'Rate',
      name:  'Rate',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size:1em'
    },
    
]"
      row-key="Ticket_ID"
      :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_By', 'Created_Date', 'Priority', 'Assignee', 'Completed_Date', 'Rate']"
      :rows-per-page-options="[5,9,10,15,20,25,30,0]"
>
      <template #body="props">
        <q-tr class="white" :props="props">
          <q-td key="Ticket_ID" class="text-center" style="color: black; font-style: inherit; 
          font-size: 14px;" >
            {{ props.row.Ticket_ID }}
          </q-td>
          <q-td key="Subject" >
            {{ props.row.Subject }}
          </q-td>
          <q-td key="Category" >
            {{ props.row.Category }}
          </q-td>
          <q-td key="Created_By">
            {{ props.row.Created_By }}
          </q-td>
          <q-td key="Created_Date" class="text-center" style="color: black; font-style: inherit;">
            {{ props.row.Created_Date }}
          </q-td>
          <q-td key="Priority" class="text-center" style="color: black; font-style: inherit;">
            <q-chip>{{ props.row.Priority }}</q-chip>
          </q-td>
          <q-td key="Assignee">
            {{ props.row.Assignee }}
          </q-td>
          <q-td key="Completed_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
            {{ props.row.Completed_Date }}
          </q-td>
          <q-td key="Rate" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
            {{ props.row.Rate }}
          </q-td>
        </q-tr>
      </template>  
    </q-table>
</q-tab-panel>
  </q-tab-panels>
    </q-page>
</template>
      

<script setup>
import { ref } from 'vue';

const currentTab = ref('Ongoing')

</script>

<style lang="scss" scoped src="./DepartmentTask.scss"></style>
