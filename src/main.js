import Vue from 'vue';
import App from './App';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;

Vue.use(Toasted, {
  duration: 3000,
  position: 'top-right',
  singleton: true,
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
