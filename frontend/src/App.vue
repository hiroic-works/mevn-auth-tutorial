<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-blue-500 text-white flex items-center justify-between px-2">
      <div class="text-2xl">サンプルサイト</div>
      <nav class="flex items-center justify-end h-16">
        <RouterLink to="/" class="ml-2">Home</RouterLink>
        <RouterLink to="/mypage" class="ml-2">Mypage</RouterLink>
        <RouterLink to="/signin" class="ml-2">Signin</RouterLink>
        <RouterLink to="/signup" class="ml-2">Signup</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>