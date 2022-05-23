import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
      path: 'home',
      name: 'Home',
      alias: '',
      component: () => import('../views/Home.vue'),
      children: [{
        alias: '',
        path: 'hot',
        name: 'hot',
        component: () => import('../views/Hot.vue'),
        meta: {
          keepAlive: true,
          deepth: 2
        }
      }, {
        path: 'comming',
        name: 'comming',
        component: () => import('../views/Comming.vue'),
        meta: {
          keepAlive: true,
          deepth: 2
        }
      }, ],
      //特别重要         三层路由切换显示
      redirect: 'hot'

    }, {
      path: 'cinema',
      name: 'Cinema',
      component: () => import('../views/Cinema.vue'),
      meta: {
        keepAlive: false,
        deepth: 2
      }
    }, {
      path: 'my',
      name: 'My',
      component: () => import('../views/My.vue')
    }, ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/detail?movieId=:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      keepAlive: true,
      deepth: 3
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue'),
    meta: {
      keepAlive: true,
      deepth: 3
    }
  }, {
    path: '/citys',
    name: 'Citys',
    component: () => import('../views/Citys.vue')
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('../views/Screening.vue'),
    meta: {
      keepAlive: true,
      deepth: 5
    }
  },
  {
    path: '/show',
    name: 'Show',
    component: () => import('../views/Show.vue'),
    meta: {
      keepAlive: true,
      deepth: 4
    }
  },

  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../views/Tickets.vue'),
    meta: {
      keepAlive: false,
      deepth: 6
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router