import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { Quasar, Notify, Dialog } from 'quasar';

// Quasar styles + icons (previously handled by the Quasar CLI).
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

// App-level styles.
import './css/app.scss';

// Default layout applied to pages that don't set their own.
import MainLayout from './layouts/MainLayout.vue';
import AdminLayout from './layouts/Admin.vue';

// Eagerly import all page components so Inertia can resolve them by name.
const pages = import.meta.glob('./pages/**/*.vue', { eager: true });

createInertiaApp({
  resolve: (name) => {
    const page = pages[`./pages/${name}.vue`];
    if (!page) {
      throw new Error(`Inertia page not found: ${name}`);
    }
    const component = page.default;
    // Apply a default layout unless the page explicitly opts out (layout: null)
    // or already defines one. Admin pages get the Admin layout.
    if (component.layout === undefined && !name.startsWith('Auth/')) {
      component.layout = name.startsWith('admin/') ? AdminLayout : MainLayout;
    }
    return component;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(Quasar, {
        plugins: { Notify, Dialog },
      })
      .mount(el);
  },
});
