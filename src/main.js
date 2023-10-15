import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const app = createApp(App)
app.mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);

import axios from '@/plugins/http/axios'
app.config.globalProperties.$axios = axios
