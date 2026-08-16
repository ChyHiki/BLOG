import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/PostListView.vue'),
    meta: { title: '全部文章' },
  },
  {
    path: '/posts/:slug',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · 我的博客` : '我的博客'
})

export default router
