import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import Axios from 'axios'
import '../public/assets/css/bootstrap.min.css'
import '../public/assets/css/typography.css'
import '../public/assets/css/style.css'
import '../public/assets/css/responsive.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

// For Error interceptor
Axios.interceptors.response.use(undefined, (error) => {
    const { status } = error.response;
    if (status === 401) {
        router.push('/login').then(() => { window.location.reload(); })
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
    }
});
// End of Error Interceptor