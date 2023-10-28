import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import axios from './plugins/http/axios'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import store from './stores'

const app = createApp(App)
app.config.globalProperties.$http = axios

app.use(Antd)
.use(store)
.mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
)

