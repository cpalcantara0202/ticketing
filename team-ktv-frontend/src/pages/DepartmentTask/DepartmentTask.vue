<template>
  <q-page>
    <q-tabs class="check1" v-model="currentTab" align="right" :breakpoint="600" no-caps dense>
      <!-------------------- ONGOING ------------------------->

      <q-tab label="Ongoing" name="Ongoing" icon="sync" stack
        class="bg-white text-primary">
        <q-badge color="red" floating>{{ ongoing.length }}</q-badge>
      </q-tab>
      <!-------------------- FOR APPROVAL ------------------------->

      <q-tab label="For Approval" name="ForApproval" icon="approval" stack
        class="bg-primary text-white">
        <q-badge color="red" floating>{{ forApproval.length }}</q-badge>
      </q-tab>
      <!-------------------- FOR REVIEW ------------------------->

      <q-tab label="For Review" name="ForReview" icon="rate_review" stack
        class="bg-white text-primary">
        <q-badge color="red" floating>{{ forReview.length }}</q-badge>
      </q-tab>
      <!-------------------- DONE ------------------------->

      <q-tab label="Done" name="Done" icon="task" stack
        class="bg-primary text-white">
        <q-badge color="red" floating>{{ done.length }}</q-badge>
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="currentTab">

      <!-----------------------Ongoing Table--------------------->

      <q-tab-panel name="Ongoing" class="tasklist_tbl">
        <TicketTable :rows="ongoing" :columns="ongoingColumns" dense />
      </q-tab-panel>

      <!-----------------------For Approval Table--------------------->

      <q-tab-panel name="ForApproval" class="tasklist_tbl">
        <TicketTable :rows="forApproval" :columns="forApprovalColumns" />
      </q-tab-panel>

      <!-----------------------For Review Table--------------------->

      <q-tab-panel name="ForReview" class="tasklist_tbl">
        <TicketTable :rows="forReview" :columns="forReviewColumns" dense />
      </q-tab-panel>

      <!-----------------------Done Table--------------------->

      <q-tab-panel name="Done" class="tasklist_tbl">
        <TicketTable :rows="done" :columns="doneColumns" dense />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import TicketTable from 'components/TicketTable.vue'

// Ticket data provided as props by the Express `/department_task` route.
defineProps({
  ongoing: { type: Array, default: () => [] },
  forApproval: { type: Array, default: () => [] },
  forReview: { type: Array, default: () => [] },
  done: { type: Array, default: () => [] },
})

const currentTab = ref('Ongoing')

// Column definitions for each tab (compact { label, field } form).
const ongoingColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED BY', field: 'Created_By' },
  { label: 'CREATED DATE', field: 'Created_Date' },
  { label: 'PRIORITY', field: 'Priority' },
  { label: 'ASSIGNEE', field: 'Assignee' },
  { label: 'ASSIGNED BY', field: 'Assigned_By' },
  { label: 'ASSIGN DATE', field: 'Assign_Date' },
]

const forApprovalColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED BY', field: 'Created_By' },
  { label: 'CREATED DATE', field: 'Created_Date' },
  { label: 'PRIORITY', field: 'Priority' },
]

const forReviewColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED BY', field: 'Created_By' },
  { label: 'CREATED DATE', field: 'Created_Date' },
  { label: 'PRIORITY', field: 'Priority' },
  { label: 'ASSIGNEE', field: 'Assignee' },
  { label: 'COMPLETED DATE', field: 'Completed_Date' },
]

const doneColumns = [
  { label: 'TICKET ID', field: 'Ticket_ID' },
  { label: 'SUBJECT', field: 'Subject' },
  { label: 'CATEGORY', field: 'Category' },
  { label: 'CREATED BY', field: 'Created_By' },
  { label: 'CREATED DATE', field: 'Created_Date' },
  { label: 'PRIORITY', field: 'Priority' },
  { label: 'ASSIGNEE', field: 'Assignee' },
  { label: 'COMPLETED DATE', field: 'Completed_Date' },
  { label: 'RATE', field: 'Rate' },
]
</script>

<style lang="scss" scoped src="./DepartmentTask.scss"></style>
