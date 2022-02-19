<script setup>
import { storeToRefs } from 'pinia';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuthStore } from './stores/useAuth';
const auth = useAuthStore();
const router = useRouter();

const { isLoggedIn } = storeToRefs(auth);

const signOut = () => {
  auth.signout();
  alert('サインアウトしました');
  router.push('/');
};
</script>

<template>
  <header class="bg-blue-500 text-white flex items-center justify-between px-2">
    <div class="text-2xl">サンプルサイト</div>
    <nav class="flex items-center justify-end h-16">
      <RouterLink to="/" class="ml-2">Home</RouterLink>
      <template v-if="isLoggedIn">
        <RouterLink to="/mypage" class="ml-2">Mypage</RouterLink>
        <a @click.prevent="signOut" href="#" class="ml-2">Signout</a>
      </template>
      <template v-if="!isLoggedIn">
        <RouterLink to="/signin" class="ml-2">Signin</RouterLink>
        <RouterLink to="/signup" class="ml-2">Signup</RouterLink>
      </template>
    </nav>
  </header>

  <RouterView />
</template>
