import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const role = String(localStorage.getItem('user_role'));
    const isCreator = role === '3';
    const isAdmin = role === '1';

    // Department Task is restricted from Creators and Admins.
    // Employee List is restricted from Creators only.
    const blocked: string[] = [];
    if (isCreator || isAdmin) blocked.push('/dashboard/DepartmentTask');
    if (isCreator) blocked.push('/dashboard/EmployeeList');

    if (to.path !== '/login' && !isAuthenticated) {
      next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
      next('/dashboard');
    } else if (blocked.includes(to.path)) {
      next('/dashboard');
    } else {
      next();
    }
  });

  return Router;
});
