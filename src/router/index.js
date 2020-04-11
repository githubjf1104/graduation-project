import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
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
      component: () => import('@/components/home/Index.vue')
    },
    {
      path: '/category',
      name: 'Category',
      redirect: '/category/commonView',
      component: () => import('@/components/category/Category.vue'),
      children: [{
        path: 'commonView',
        name: 'CommonView',
        component: () => import('@/components/category/component/CommonView.vue')
      }]
    },
    {
      path: '/edit',
      name: 'Eidt',
      component: () => import('@/components/edit/Edit.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/login/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/register/Register.vue')
    }
  ]
})
