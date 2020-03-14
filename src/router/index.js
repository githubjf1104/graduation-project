import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/components/home/index.vue')
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/components/category/category.vue')
    }
  ]
})
