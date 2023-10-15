import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import axios from './plugins/http/axios'

const app = createApp(App)
app.mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
