<template>
  <q-page class="dashboard">
    <div class="tiles">
      <div @click="$router.push('/admin/DepartmentManagement')" class="tile"><q-icon name="domain" size="40px" /><span>Department Management</span></div>
      <div @click="$router.push('/admin/EmployeeManagement')" class="tile"><q-icon name="group" size="40px" /><span>Employee Management</span></div>
      <div @click="$router.push('/admin/JobOrderCategoryManagement')" class="tile"><q-icon name="assignment_ind" size="40px" /><span>Job Order Category Management</span></div>
      <div @click="$router.push('/admin/Reports')" class="tile"><q-icon name="bar_chart" size="40px" /><span>Reports</span></div>
      <div @click="$router.push('/admin/BackupAndRestore')" class="tile"><q-icon name="settings_backup_restore" size="40px" /><span>Backup & Restore</span></div>
      <div @click="$router.push('/admin/AuditTrain')" class="tile"><q-icon name="logout" size="40px" /><span>Audit Train</span></div>
      <div @click="logout" class="tile"><q-icon name="logout" size="40px" /><span>Logout</span></div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('logged_in_user');
  localStorage.removeItem('user_role');
  router.push('/login');
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
}
.tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
}
.tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  background-color: #009688;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding: 15px;
  &:hover { opacity: 0.8; }
  span { margin-top: 10px; }
}
</style>
