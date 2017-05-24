import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  {path: '/goods', component: goods}, {path: '/ratings', component: ratings}, {path: '/seller', component: seller}
];
const router = new VueRouter({
  'linkActiveClass': 'active',
   routes // （缩写）相当于 routes: routes
});
const app = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
router.push('/goods');
export default app;
