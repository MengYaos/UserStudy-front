import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'
import two from "../views/two";

Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: "index",
      component: index,
      meta: {
        // 页面标题title
        title: 'MAST User Study'
      }
    },
    {
      path: '/second',
      name: "sencond",
      component: two
    }
];

const router = new VueRouter({
  // mode: 'history',
  base: '/dist',
  routes
});

export default router
