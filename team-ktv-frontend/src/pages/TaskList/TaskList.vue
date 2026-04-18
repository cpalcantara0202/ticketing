<template>
  <q-page padding>
    <q-tabs class="check1" v-model="currentTab" narrow-indicator align="right" :breakpoint="600" no-caps dense >
            <!-------------------- MY TASK ------------------------->
      <q-tab label="My Task" name="MyTask" icon="event_available" stack
      class="bg-white text-primary">
        <q-badge color="red" floating>1</q-badge>
      </q-tab>
            <!-------------------- SUBMITTED ------------------------->
      <q-tab label="Submitted" name="Submitted" icon="check_circle_outline" stack
      class="bg-primary text-white">
        <q-badge color="red" floating>10</q-badge>
      </q-tab>
             <!--------------------FOR REVIEW ------------------------->

      <q-tab label="For Review" name="ForReview" icon="rate_review" stack
      class="bg-white text-primary">
        <q-badge color="red" floating>8</q-badge>
      </q-tab>
      
             <!--------------------CREATE JOB ORDER ------------------------->
      <q-btn v-model="model" push glossy @click="prompt = true" 
        style="background-color: #1976D2;" class="btnjob_order">
        <q-icon name="create" />
        <div class="txt">Create <br>Job Order</div>
      </q-btn> 


      <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 43%">
        <q-card-section class="pencil">
          <q-icon class="create_icon q-gutter-m" size="3em" 
           style="color: #1976D2" name="create" />
          <div class="text-h6">Create Job Order</div>
      </q-card-section>
        

    <!------Subject TxtBox----->

    <q-form class="main" :breakpoint="600">
      <div>
        <q-input class="sub" outlined bottom-slots v-model="text" label="Subject" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="subject" />
          </template>
        </q-input>

            <!-----------------------Category Dropdown--------------------->
    
      <q-btn-dropdown class="category" split color="blue" push no-caps
      @click="onMainClick">
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon left name="category" />
          <div class="text-center">Category</div>
        </div>
      </template>
        <q-list>  
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Incident Report</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Service Request</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Routine</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Ad hoc/Projects</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
            
            <!-----------------------Department Dropdown--------------------->

    <q-btn-dropdown class="department" split color="blue" push no-caps
      @click="onMainClick">
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon left name="home" />
          <div class="text-center">Department</div>
        </div>
      </template>
        <q-list>  
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Operations Department</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Finance & Admin Department</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Marketing Department</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>IT Department</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

                <!-----------------------Description--------------------->

    <q-input class="description" v-model="textareaModel"  clearable
      type="textarea" color="blue" label="Description" @keydown="processTextareaFill"
      @focus="processTextareaFill" :shadow-text="textareaShadowText">
      <template v-slot:prepend>
            <q-icon name="message" />
          </template>
    </q-input>
      
                  <!-----------------------Attachment--------------------->

      <p class="txtAttachment">Attachment:</p>
      <q-input class="attachment"  @update:model-value="val => { files = val }"
        multiple filled color="blue" type="file" hint="* Select Image"  />
        
                  <!-----------------------Priority--------------------->

        <q-btn-dropdown class="Priority" split color="blue" push no-caps
      @click="onMainClick">
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon left name="flag" />
          <div class="txtpriority">Priority</div>
        </div>
      </template>
        <q-list>  
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>High Priority</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>  
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Medium Priority</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Low Priority</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
      </div>   
  </q-form>
                  <!-----------------------Save and Cancel--------------------->

  <q-card-actions align="right" class="text-primary">
    <q-btn  flat label="Save" v-close-popup  />
      <q-btn  flat label="Cancel" v-close-popup  />
  </q-card-actions>
    </q-card>
  </q-dialog>
</q-tabs>

    <!--Tab Panel for my task, submit, review----------------------------------->
    <q-tab-panels v-model="currentTab">

      <q-tab-panel name="MyTask" class="tasklist_tbl">
        <q-table  separator="cell" wrap-cells 
        :rows="[
        { 
        Ticket_ID:'001',
        Subject:'Internet Problem',
        Category:'Incident Report',
        Created_By:'panda@gmail.com',
        Priority:'Low Priority',
        Assign_Date:'2023-07-11'
      },
      {
        Ticket_ID:'002',
        Subject:'Room Cleaning',
        Category:'Service Request',
        Created_By:'cat@gmail.com',
        Priority:'Low Priority',
        Assign_Date:'2023-07-11'
      },
      {
        Ticket_ID:'003',
        Subject:'Bills Payment',
        Category:'Routine',
        Created_By:'dog@gmail.com',
        Priority:'Low Priority',
        Assign_Date:'2023-07-11'
      },
      {
        Ticket_ID:'001',
        Subject:'Internet Problem',
        Category:'Incident Report',
        Created_By:'panda@gmail.com',
        Priority:'Low Priority',
        Assign_Date:'2023-07-11'
      },
      {
        Ticket_ID:'002',
        Subject:'Room Cleaning',
        Category:'Service Request',
        Created_By:'cat@gmail.com',
        Priority:'Low Priority',
        Assign_Date:'2023-07-11'
      },
      {
        Ticket_ID:'003',
        Subject:'Bills Payment',
        Category:'Routine',
        Created_By:'dog@gmail.com',
        Priority:'Low Priority',
        Assign_Date:'2023-07-11'
      },
      {
        Ticket_ID:'003',
        Subject:'Development',
        Category:'Project',
        Created_By:'dog@gmail.com',
        Priority:'Low Priority',
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
            label: 'PRIORITY',
            field: 'Priority',
            name:  'Priority',
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
            :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_By', 'Priority', 'Assign_Date']"
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
                <q-td key="Priority" class="text-center" style="color: black; font-style: inherit;">
                  <q-chip>{{ props.row.Priority }}</q-chip>
                </q-td>
                <q-td key="Assign_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.Assign_Date }}
                </q-td>
              </q-tr>
            </template>
          
          
          </q-table>
      </q-tab-panel>
                        <!-----------------------Submitted Table--------------------->

      <q-tab-panel name="Submitted" class="tasklist_tbl">
        <q-table separator="cell" wrap-cells 
        :rows="[
          {
            Ticket_ID:'001',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Status:'For Approval'
          },
          {
            Ticket_ID:'002',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'High Priority',
            Status:'Ongoing'
          },
          {
            Ticket_ID:'003',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Status:'For Approval'
          },
          {
            Ticket_ID:'002',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'High Priority',
            Status:'Ongoing'
          },
          {
            Ticket_ID:'003',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Status:'For Approval'
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
            label: 'CREATED DATE',
            field: 'Created_Date',
            name:  'Created_Date',
            align: 'center',
            headerClasses: 'bg-blue-7 text-white',
            headerStyle: 'font-size: 1em'
          },
          {
            label: 'SUBMITTED TO',
            field: 'Submitted_To',
            name:  'Submitted_To',
            align: 'center',
            headerClasses: 'bg-blue-7 text-white',
            headerStyle: 'font-size: 1em'
          },
          {
            label: 'ASSIGNEE',
            field: 'Assignee',
            name:  'Assignee',
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
          {
            label: 'STATUS',
            field: 'Status',
            name:  'Status',
            align: 'center',
            headerClasses: 'bg-blue-7 text-white',
            headerStyle: 'font-size: 1em'
          }
        ]" 
            row-key="Ticket_ID"
            :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_Date', 'Submitted_To', 'Assignee', 'Priority', 'Status']"
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
                <q-td key="Created_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.Created_Date }}
                </q-td>
                <q-td key="Submitted_To">
                  {{ props.row.Submitted_To }}
                </q-td>
                <q-td key="Assignee">
                  {{ props.row.Assignee }}
                </q-td>
                <q-td key="Priority" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  <q-chip>{{ props.row.Priority }}</q-chip>
                </q-td>
                <q-td key="Status" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.Status }}
                </q-td>
              </q-tr>
            </template>
          
          
          </q-table>

      </q-tab-panel>

                 <!-----------------------For Review Table--------------------->

      <q-tab-panel name="ForReview" class="tasklist_tbl">
        <q-table separator="cell" wrap-cells 
        
        :rows="[
          {
            Ticket_ID:'001',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Completed_Date:'2023-07-07'
          },
          {
            Ticket_ID:'001',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Completed_Date:'2023-07-07'
          },
          {
            Ticket_ID:'001',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Completed_Date:'2023-07-07'
          },
          {
            Ticket_ID:'001',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Completed_Date:'2023-07-07'
          },
          {
            Ticket_ID:'001',
            Subject:'Internet Problem',
            Category:'Incident Report',
            Created_Date:'2023-07-11',
            Submitted_To:'Marketing Department',
            Assignee:'Cary Apeladas',
            Priority:'Low Priority',
            Completed_Date:'2023-07-07'
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
            label: 'CREATED DATE',          
            field: 'Created_Date',
            name:  'Created_Date',
            align:'center',
            headerClasses: 'bg-blue-7 text-white',
            headerStyle: 'font-size: 1em'
          },
          {
            label: 'SUBMITTED TO',          
            field: 'Submitted_To',
            name:  'Submitted_To',
            align:'center',
            headerClasses: 'bg-blue-7 text-white',
            headerStyle: 'font-size: 1em'
          },
          {
            label: 'ASSIGNEE',          
            field: 'Assignee',
            name:  'Assignee',
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
            headerStyle: 'font-size: 1em'
          },
          {
            label: 'COMPLETED DATE',          
            field: 'Completed_Date',
            name:  'Completed_Date',
            align:'center',
            headerClasses: 'bg-blue-7 text-white',
            headerStyle: 'font-size: 1em'
          }
        ]"
             row-key="Ticket_ID"
            :visible-columns="['Ticket_ID', 'Subject', 'Category', 'Created_Date', 'Submitted_To', 'Assignee', 'Priority', 'Completed_Date']"
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
                <q-td key="Created_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.Created_Date }}
                </q-td>
                <q-td key="Submitted_To">
                  {{ props.row.Submitted_To }}
                </q-td>
                <q-td key="Assignee">
                  {{ props.row.Assignee }}
                </q-td>
                <q-td key="Priority" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  <q-chip>{{ props.row.Priority }}</q-chip>
                </q-td>
                <q-td key="Completed_Date" class="text-center" style="color: black; font-style: inherit; font-size: 14px;">
                  {{ props.row.Completed_Date }}
                </q-td>
              </q-tr>
            </template>
          
          
          </q-table>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&      END     &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->

<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      prompt: ref(false),
    }
  },

      //mytask, submitted, for review button ---------
      model: ref('currentTab'),
       //prompt ---------
      //Attachment ---------
      file: ref(null),
      files: ref(null),
      //Description ---------
      textareaModel: ref(''),
      //ComboBox ---------
      onItemClick () {
        // console.log('Clicked on an Item')
      }
}
</script>

<script setup>
import { ref } from 'vue'
const label =ref()
const currentTab = ref('MyTask')
//Submitted
//For Review


</script>


<style lang="scss" scoped src="./TaskList.scss"></style>