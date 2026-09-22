<template>
  <q-page padding>
    <q-tabs class="check1" v-model="currentTab" narrow-indicator align="right" :breakpoint="600" no-caps dense>
      <!-------------------- MY TASK ------------------------->
      <q-tab label="My Task" name="MyTask" icon="event_available" stack
        class="bg-white text-primary">
        <q-badge color="red" floating>{{ myTask.length }}</q-badge>
      </q-tab>
      <!-------------------- SUBMITTED ------------------------->
      <q-tab label="Submitted" name="Submitted" icon="check_circle_outline" stack
        class="bg-primary text-white">
        <q-badge color="red" floating>{{ submitted.length }}</q-badge>
      </q-tab>
      <!--------------------FOR REVIEW ------------------------->
      <q-tab label="For Review" name="ForReview" icon="rate_review" stack
        class="bg-white text-primary">
        <q-badge color="red" floating>{{ forReview.length }}</q-badge>
      </q-tab>

      <!--------------------CREATE JOB ORDER ------------------------->
      <q-btn push glossy @click="prompt = true"
        style="background-color: #009688;" class="btnjob_order">
        <q-icon name="create" />
        <div class="txt">Create <br>Job Order</div>
      </q-btn>

      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 43%">
          <q-card-section class="pencil">
            <q-icon class="create_icon q-gutter-m" size="3em"
              style="color: #009688" name="create" />
            <div class="text-h6">Create Job Order</div>
          </q-card-section>

          <!------Subject TxtBox----->

          <q-form class="main" :breakpoint="600" @submit.prevent="saveJobOrder">
            <div>
              <q-input class="sub" outlined bottom-slots v-model="jobOrderForm.subject" label="Subject">
                <template v-slot:prepend>
                  <q-icon name="subject" />
                </template>
              </q-input>

              <!-----------------------Category Dropdown--------------------->

              <q-btn-dropdown class="category" split color="teal" push no-caps>
                <template v-slot:label>
                  <div class="row items-center no-wrap">
                    <q-icon left name="category" />
                    <div class="text-center">{{ jobOrderForm.category || 'Category' }}</div>
                  </div>
                </template>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.category = 'Incident Report'">
                    <q-item-section>
                      <q-item-label>Incident Report</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.category = 'Service Request'">
                    <q-item-section>
                      <q-item-label>Service Request</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.category = 'Routine'">
                    <q-item-section>
                      <q-item-label>Routine</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.category = 'Ad hoc/Projects'">
                    <q-item-section>
                      <q-item-label>Ad hoc/Projects</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <!-----------------------Department Dropdown--------------------->

              <q-btn-dropdown class="department" split color="teal" push no-caps>
                <template v-slot:label>
                  <div class="row items-center no-wrap">
                    <q-icon left name="home" />
                    <div class="text-center">{{ jobOrderForm.department || 'Department' }}</div>
                  </div>
                </template>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.department = 'Operations Department'">
                    <q-item-section>
                      <q-item-label>Operations Department</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.department = 'Finance & Admin Department'">
                    <q-item-section>
                      <q-item-label>Finance &amp; Admin Department</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.department = 'Marketing Department'">
                    <q-item-section>
                      <q-item-label>Marketing Department</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.department = 'IT Department'">
                    <q-item-section>
                      <q-item-label>IT Department</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <!-----------------------Description--------------------->

              <q-input class="description" v-model="jobOrderForm.description" clearable
                type="textarea" color="teal" label="Description">
                <template v-slot:prepend>
                  <q-icon name="message" />
                </template>
              </q-input>

              <!-----------------------Attachment--------------------->

              <p class="txtAttachment">Attachment:</p>
              <q-input class="attachment" @update:model-value="val => { jobOrderForm.files = val }"
                multiple filled color="teal" type="file" hint="* Select Image" />

              <!-----------------------Priority--------------------->

              <q-btn-dropdown class="Priority" split color="teal" push no-caps>
                <template v-slot:label>
                  <div class="row items-center no-wrap">
                    <q-icon left name="flag" />
                    <div class="txtpriority">{{ jobOrderForm.priority || 'Priority' }}</div>
                  </div>
                </template>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.priority = 'High Priority'">
                    <q-item-section>
                      <q-item-label>High Priority</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.priority = 'Medium Priority'">
                    <q-item-section>
                      <q-item-label>Medium Priority</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list>
                  <q-item clickable v-close-popup @click="jobOrderForm.priority = 'Low Priority'">
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
            <q-btn flat label="Save" @click="saveJobOrder" v-close-popup />
            <q-btn flat label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-tabs>

    <!--Tab Panel for my task, submit, review----------------------------------->
    <q-tab-panels v-model="currentTab">

      <q-tab-panel name="MyTask" class="tasklist_tbl">
        <TicketTable :rows="myTask" :columns="myTaskColumns" />
      </q-tab-panel>

      <!-----------------------Submitted Table--------------------->

      <q-tab-panel name="Submitted" class="tasklist_tbl">
        <TicketTable :rows="submitted" :columns="submittedColumns" />
      </q-tab-panel>

      <!-----------------------For Review Table--------------------->

      <q-tab-panel name="ForReview" class="tasklist_tbl">
        <TicketTable :rows="forReview" :columns="forReviewColumns" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import TicketTable from 'components/TicketTable.vue'

// Ticket data provided as props by the Express `/task_list` route.
defineProps({
  myTask: { type: Array, default: () => [] },
  submitted: { type: Array, default: () => [] },
  forReview: { type: Array, default: () => [] },
})

const currentTab = ref('MyTask')
const prompt = ref(false)

// Create Job Order form wired to Inertia.
const jobOrderForm = useForm({
  subject: '',
  category: '',
  department: '',
  description: '',
  priority: '',
  files: null,
})

function saveJobOrder () {
  jobOrderForm.post('/create_ticket')
}

// Column definitions for each tab (compact { label, field } form).
const myTaskColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED BY', field: 'Created_By' },
  { label: 'PRIORITY', field: 'Priority' },
  { label: 'ASSIGN DATE', field: 'Assign_Date' },
]

const submittedColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED DATE', field: 'Created_Date' },
  { label: 'SUBMITTED TO', field: 'Submitted_To' },
  { label: 'ASSIGNEE', field: 'Assignee' },
  { label: 'PRIORITY', field: 'Priority' },
  { label: 'STATUS', field: 'Status' },
]

const forReviewColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED DATE', field: 'Created_Date' },
  { label: 'SUBMITTED TO', field: 'Submitted_To' },
  { label: 'ASSIGNEE', field: 'Assignee' },
  { label: 'PRIORITY', field: 'Priority' },
  { label: 'COMPLETED DATE', field: 'Completed_Date' },
]
</script>

<style lang="scss" scoped src="./TaskList.scss"></style>
