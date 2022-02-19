import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyPageView from '../views/MyPageView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'

import { useAuthStore } from '@/stores/useAuth.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView,
      meta: {
        requiresAuth: true, // 認証必須ページ
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  // storeの読み込み
  const auth = useAuthStore();

  // ユーザー情報取得済み（サインイン済み）ユーザーがサインインページに入ったらTOPにリダイレクト
  if (to.path === '/signin' && auth.isLoggedIn) {
    next('/');
    return;
  }
  // 認証ページにサインインしてないユーザーが入ったらサインインページにリダイレクト
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.isLoggedIn
  ) {
    next('/signin');
    return;
  }

  next();
});


export default router
