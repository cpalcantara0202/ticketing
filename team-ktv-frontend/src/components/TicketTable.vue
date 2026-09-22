<template>
  <q-table
    separator="cell"
    wrap-cells
    :dense="dense"
    :rows="rows"
    :columns="preparedColumns"
    :row-key="rowKey"
    :rows-per-page-options="[5, 9, 10, 15, 20, 25, 30, 0]"
    style="font-family: inherit"
    class="tasklist_tbl"
  >
    <template #body="props">
      <q-tr class="white" :props="props">
        <q-td
          v-for="col in preparedColumns"
          :key="col.name"
          :props="props"
          class="text-center cell"
        >
          <q-chip v-if="col.name === 'Priority'">{{ props.row[col.field] }}</q-chip>
          <template v-else>{{ props.row[col.field] }}</template>
        </q-td>
      </q-tr>
    </template>

    <template #no-data>
      <div class="full-width row flex-center q-pa-md text-grey">
        No records found.
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { computed } from 'vue';

/**
 * Reusable ticket table. Replaces the 7x copy-pasted q-table blocks that
 * previously lived inline in TaskList.vue and DepartmentTask.vue.
 *
 * `columns` accepts a compact list of { label, field } and this component
 * fills in the shared header styling. You may also pass full Quasar column
 * definitions and they'll be used as-is.
 */
const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, required: true },
  rowKey: { type: String, default: 'Ticket_ID' },
  dense: { type: Boolean, default: false },
});

const preparedColumns = computed(() =>
  props.columns.map((c) => ({
    align: 'center',
    headerClasses: 'bg-teal-7 text-white',
    headerStyle: 'font-size: 1em',
    name: c.name || c.field,
    field: c.field,
    label: c.label,
    ...c,
  }))
);
</script>

<style scoped>
.cell {
  color: black;
  font-style: inherit;
  font-size: 14px;
}
</style>
