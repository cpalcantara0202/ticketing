<template>
  <div>
    <q-input filled  class="filter"  :model-value=" `From:  ${dateRange.from}    -    To:  ${dateRange.to}`">
     <template v-slot:append >
       <q-icon name="event" class="cursor-pointer">
         <q-popup-proxy cover transition-show="scale" transition-hide="scale">
           <q-date  v-model="dateRange" range>
             <div class="row items-center justify-end">
               <q-btn v-close-popup label="Close" color="primary" flat />
             </div>
           </q-date>
         </q-popup-proxy>
       </q-icon>
     </template>
   </q-input>
  </div>
  <q-page>
    <q-table  separator="cell" wrap-cells class="table"
  :rows="[
  { 
  Employee_ID:'001',
  Name:'Caryl Apeladas',
  Designation: 'Driver',
  Ongoing:'24',
  Completed:'100'
},
{ 
  Employee_ID:'002',
  Name:'Joana Belgica',
  Designation: 'Staff',
  Ongoing:'18',
  Completed:'98'
},
{ 
  Employee_ID:'003',
  Name:'Elizabeth Legarde',
  Designation: 'Dispatcher',
  Ongoing:'4',
  Completed:'70'
},
{ 
  Employee_ID:'004',
  Name:'Christian Alcantara',
  Designation: 'Driver',
  Ongoing:'10',
  Completed:'100'
},

]"
style="font-family: inherit"
:columns="[
    {
      label: 'EMPLOYEE ID',          
      field: 'Employee_ID',
      name:  'Employee_ID',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

      
    },
    {
      label: 'NAME',
      field: 'Name',
      name:  'Name',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'DESIGNATION',
      field: 'Designation',
      name:  'Designation',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'

    },
    {
      label: 'ONGOING ',
      field: 'Ongoing',
      name:  'Ongoing',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
     
    },
    {
      label: 'COMPLETED',
      field: 'Completed',
      name:  'Completed',
      align:'center',
      headerClasses: 'bg-blue-7 text-white',
      headerStyle: 'font-size: 1em'
    
    },
    
]"
      row-key="Ticket_ID"
      :visible-columns="['Employee_ID', 'Name', 'Designation', 'Ongoing', 'Completed']"
      :rows-per-page-options="[5,9,10,15,20,25,30,0]"
>
      <template #body="props">
        <q-tr class="white" :props="props">
          <q-td key="Employee_ID" class="text-center" style="color: black; font-style: inherit; 
          font-size: 14px;" >
            {{ props.row.Employee_ID }}
          </q-td>
          <q-td key="Name" >
            {{ props.row.Name }}
          </q-td>
          <q-td key="Designation" >
            {{ props.row.Designation }}
          </q-td>
          <q-td key="Ongoing" class="text-center" style="color: black; font-style: inherit;">
            {{ props.row.Ongoing }}
          </q-td>
          <q-td key="Completed" class="text-center" style="color: black; font-style: inherit;">
            {{ props.row.Completed }}
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
   const dateRange = ref({from: '', to: ''})
   return {
     dateRange
   }
 }
}

</script> 

<style lang="scss" scoped src="./EmployeeList.scss"></style>