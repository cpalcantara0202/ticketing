<template>
    <q-input filled :model-value="`${dateRange.from} - ${dateRange.to}`">
     <template v-slot:append>
       <q-icon name="event" class="cursor-pointer">
         <q-popup-proxy cover transition-show="scale" transition-hide="scale">
           <q-date v-model="dateRange" range>
             <div class="row items-center justify-end">
               <q-btn v-close-popup label="Close" color="primary" flat />
             </div>
           </q-date>
         </q-popup-proxy>
       </q-icon>
     </template>
   </q-input>
</template>

<script>
import { ref } from 'vue'

export default {
 setup () {
   const dateRange = ref({from: ' ', to: ''})
   return {
     dateRange
   }
 }
}
</script>