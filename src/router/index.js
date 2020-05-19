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
      beforeEnter (to, from, next) {
        if (to.path === '/') {
          next('/index')
        } else {
          next()
        }
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/components/home/Index.vue')
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('@/components/details/Detail.vue')
    },
    {
      path: '/category',
      name: 'Category',
      redirect: '/category/commonView',
      component: () => import('@/components/category/Category.vue'),
      children: [{
        path: 'commonView',
        name: 'CommonView',
        component: () => import('@/components/common/CommonView.vue')
      }]
    },
    {
      path: '/question',
      name: 'Question',
      component: () => import('@/components/questions/AskQuestion.vue')
    },
    {
      path: '/questionDetail',
      name: 'QuestionDetail',
      component: () => import('@/components/details/QuestionDetail.vue')
    },
    {
      path: '/edit',
      name: 'Eidt',
      component: () => import('@/components/edit/Edit.vue')
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('@/components/personal/Personal.vue'),
      meta: { toPersonal: false },
      beforeEnter (to, from, next) {
        if (to.name === 'Personal') {
          next({name: 'PersonArticle'})
        } else {
          next()
        }
      },
      children: [{
        path: 'personArticle',
        name: 'PersonArticle',
        component: () => import('@/components/personal/component/PersonArticle.vue')
      },
      {
        path: 'waitReply',
        name: 'WaitReply',
        component: () => import('@/components/common/WaitReply.vue')
      },
      {
        path: 'collect',
        name: 'Collect',
        component: () => import('@/components/personal/component/collect.vue')
      }]
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
    },
    {
      path: '/changepwd',
      name: 'ChangePwd',
      component: () => import('@/components/changepwd/ChangePwd.vue')
    }
  ]
})
