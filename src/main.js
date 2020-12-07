import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const init = async() => {
  const module = await import('./router');
  const router = await module.default;
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
};

init();
