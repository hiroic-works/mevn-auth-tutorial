<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-blue-500">
      <nav class="text-white flex items-center justify-end">
        <RouterLink to="/" class="m-2">Home</RouterLink>
        <RouterLink to="/about" class="m-2">About</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>