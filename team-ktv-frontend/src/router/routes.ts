import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children:
    [
      { path: '', component: () => import('pages/Dashboard/Dashboard.vue')},
      { path: 'TaskList', component: () => import('src/pages/TaskList/TaskList.vue')},
      { path: 'DepartmentTask', component: () => import('src/pages/DepartmentTask/DepartmentTask.vue')},
      { path: 'EmployeeList', component: () => import('src/pages/EmployeeList/EmployeeList.vue')},
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/Admin.vue'),
    children:
    [
      { path: '', component: () => import('pages/admin/admindashboard.vue')},
      { path: 'DepartmentManagement', component: () => import('pages/admin/DepartmentManagement.vue')},
      { path: 'EmployeeManagement', component: () => import('pages/admin/EmployeeManagement.vue')},
      { path: 'JobOrderCategoryManagement', component: () => import('pages/admin/JobOrderCategoryManagement.vue')},
      { path: 'Reports', component: () => import('pages/admin/Reports.vue')},
      { path: 'BackupAndRestore', component: () => import('pages/admin/BackupAndRestore.vue')},
      { path: 'AuditTrain', component: () => import('pages/admin/AuditTrain.vue')},
    ],
  },

  {
    path: '/login',
    component: () => import('components/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
